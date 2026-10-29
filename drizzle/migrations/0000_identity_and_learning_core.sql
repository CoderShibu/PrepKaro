-- ============ PrepKaro migration 1: identity, roles, course structure, learning progress ============

create type public.app_role as enum ('admin', 'reviewer', 'student');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  username text unique,
  avatar_url text,
  bio text,
  phone text,
  professional_summary text,
  skills_interests text[] not null default '{}',
  linkedin_url text,
  github_url text,
  portfolio_url text,
  notify_email boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role)
  values (new.id, 'student')
  on conflict (user_id, role) do nothing;
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ Course structure ============

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null default '',
  category text not null default 'General',
  level text not null default 'Beginner',
  est_hours int not null default 10,
  cover_image_url text,
  instructor_name text not null default 'PrepKaro Faculty',
  status text not null default 'draft',
  completion_note text,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  description text not null default '',
  position int not null default 0,
  requires_practice_test boolean not null default true,
  requires_assignment boolean not null default false,
  requires_project boolean not null default false,
  pass_score int not null default 70,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  skill_id uuid references public.skills(id) on delete cascade not null,
  title text not null,
  position int not null default 0,
  content_type text not null default 'text',
  video_url text,
  content text not null default '',
  duration_mins int not null default 10,
  is_free_preview boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.lesson_resources (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  title text not null,
  url text not null,
  kind text not null default 'link'
);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade not null,
  user_id uuid not null,
  status text not null default 'active',
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (course_id, user_id)
);

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  user_id uuid not null,
  completed_at timestamptz not null default now(),
  unique (lesson_id, user_id)
);

create table public.skill_progress (
  id uuid primary key default gen_random_uuid(),
  skill_id uuid references public.skills(id) on delete cascade not null,
  user_id uuid not null,
  status text not null default 'in_progress',
  completed_at timestamptz,
  unique (skill_id, user_id)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  type text not null default 'general',
  title text not null,
  body text not null default '',
  link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.add_notification(
  _user_id uuid, _type text, _title text, _body text default '', _link text default null
)
returns uuid
language sql
security definer
set search_path = public
as $$
  insert into public.notifications (user_id, type, title, body, link)
  values (_user_id, _type, _title, _body, _link)
  returning id;
$$;

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger courses_touch_updated before update on public.courses
  for each row execute function public.touch_updated_at();
create trigger profiles_touch_updated before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ============ Indexes ============
create index idx_skills_course on public.skills(course_id, position);
create index idx_lessons_skill on public.lessons(skill_id, position);
create index idx_enrollments_user on public.enrollments(user_id);
create index idx_enrollments_course on public.enrollments(course_id);
create index idx_lesson_progress_user on public.lesson_progress(user_id);
create index idx_skill_progress_user on public.skill_progress(user_id);
create index idx_notifications_user on public.notifications(user_id, created_at desc);
create index idx_courses_status on public.courses(status);

-- ============ GRANTS ============
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
GRANT ALL ON public.courses, public.skills, public.lessons, public.lesson_resources TO service_role;
GRANT SELECT ON public.courses TO anon, authenticated;
GRANT SELECT ON public.skills, public.lessons, public.lesson_resources TO authenticated;
GRANT ALL ON public.enrollments, public.lesson_progress, public.skill_progress TO service_role;
GRANT SELECT, INSERT ON public.enrollments TO authenticated;
GRANT UPDATE ON public.enrollments TO authenticated;
GRANT SELECT, INSERT ON public.lesson_progress TO authenticated;
GRANT DELETE ON public.lesson_progress TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.skill_progress TO authenticated;
GRANT SELECT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;

-- ============ RLS ============
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.courses enable row level security;
alter table public.skills enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_resources enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.skill_progress enable row level security;
alter table public.notifications enable row level security;

create policy "profiles_select_self_or_admin" on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "profiles_update_self" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "user_roles_select_own" on public.user_roles
  for select to authenticated using (user_id = auth.uid());
create policy "user_roles_admin_all" on public.user_roles
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "courses_read_published" on public.courses
  for select to anon, authenticated
  using (status = 'published' or public.has_role(auth.uid(), 'admin'));
create policy "courses_admin_write" on public.courses
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "skills_read_if_course_visible" on public.skills
  for select to authenticated
  using (
    public.has_role(auth.uid(), 'admin')
    or exists (select 1 from public.courses c where c.id = course_id and c.status = 'published')
  );
create policy "skills_admin_write" on public.skills
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "lessons_read_if_course_visible" on public.lessons
  for select to authenticated
  using (
    public.has_role(auth.uid(), 'admin')
    or exists (
      select 1 from public.skills s join public.courses c on c.id = s.course_id
      where s.id = skill_id and c.status = 'published'
    )
  );
create policy "lessons_admin_write" on public.lessons
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "resources_read_if_lesson_visible" on public.lesson_resources
  for select to authenticated
  using (
    public.has_role(auth.uid(), 'admin')
    or exists (
      select 1 from public.lessons l
      join public.skills s on s.id = l.skill_id
      join public.courses c on c.id = s.course_id
      where l.id = lesson_id and c.status = 'published'
    )
  );
create policy "resources_admin_write" on public.lesson_resources
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "enrollments_own" on public.enrollments
  for all to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'))
  with check (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create policy "lesson_progress_own" on public.lesson_progress
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "skill_progress_own" on public.skill_progress
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "notifications_own" on public.notifications
  for select to authenticated using (user_id = auth.uid());
create policy "notifications_update_own" on public.notifications
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
