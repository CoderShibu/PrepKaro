-- ============ PrepKaro migration 2: assessments, assignments, projects, reviews ============

create table public.topics (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  skill_id uuid references public.skills(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  skill_id uuid references public.skills(id) on delete set null,
  topic_id uuid references public.topics(id) on delete set null,
  type text not null default 'mcq',
  prompt text not null,
  options jsonb not null default '[]',
  correct_answers jsonb not null default '[]',
  explanation text not null default '',
  difficulty text not null default 'medium',
  points int not null default 1,
  status text not null default 'active',
  created_by uuid,
  created_at timestamptz not null default now()
);

create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade not null,
  skill_id uuid references public.skills(id) on delete cascade not null,
  title text not null,
  description text not null default '',
  kind text not null default 'practice_test',
  time_limit_mins int not null default 30,
  max_attempts int not null default 3,
  pass_score int not null default 70,
  randomize_questions boolean not null default true,
  randomize_options boolean not null default false,
  status text not null default 'draft',
  created_by uuid,
  created_at timestamptz not null default now()
);

create table public.assessment_questions (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid references public.assessments(id) on delete cascade not null,
  question_id uuid references public.questions(id) on delete cascade not null,
  position int not null default 0,
  unique (assessment_id, question_id)
);

create table public.assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid references public.assessments(id) on delete cascade not null,
  user_id uuid not null,
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  expires_at timestamptz,
  status text not null default 'in_progress',
  score int,
  passed boolean
);

create table public.assessment_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid references public.assessment_attempts(id) on delete cascade not null,
  question_id uuid references public.questions(id) on delete cascade not null,
  answer jsonb not null default 'null',
  is_correct boolean,
  earned int not null default 0
);

create table public.rubrics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  criteria jsonb not null default '[]',
  created_by uuid,
  created_at timestamptz not null default now()
);

create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  skill_id uuid references public.skills(id) on delete cascade not null,
  title text not null,
  instructions text not null default '',
  deadline timestamptz,
  allowed_types text not null default 'pdf,doc,docx,zip,png,jpg',
  max_file_mb int not null default 10,
  required boolean not null default true,
  rubric_id uuid references public.rubrics(id) on delete set null,
  created_by uuid,
  created_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  skill_id uuid references public.skills(id) on delete cascade not null,
  title text not null,
  brief text not null default '',
  objectives text not null default '',
  deliverables text not null default '',
  deadline timestamptz,
  rubric_id uuid references public.rubrics(id) on delete set null,
  created_by uuid,
  created_at timestamptz not null default now()
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'assignment',
  target_id uuid not null,
  user_id uuid not null,
  status text not null default 'draft',
  text_response text not null default '',
  repo_url text,
  demo_url text,
  attempt int not null default 1,
  submitted_at timestamptz,
  reviewer_id uuid,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index uniq_submission_attempt
  on public.submissions (kind, target_id, user_id, attempt);

create table public.submission_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references public.submissions(id) on delete cascade not null,
  storage_path text not null,
  file_name text not null,
  size_bytes bigint not null default 0,
  mime_type text not null default ''
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references public.submissions(id) on delete cascade not null,
  reviewer_id uuid not null,
  decision text not null,
  score int,
  feedback text not null default '',
  rubric_scores jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create table public.plagiarism_reports (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references public.submissions(id) on delete cascade not null,
  provider text not null default 'none',
  status text not null default 'not_configured',
  similarity_score int,
  report_url text,
  created_at timestamptz not null default now()
);

-- ============ Indexes ============
create index idx_questions_skill on public.questions(skill_id);
create index idx_questions_status on public.questions(status);
create index idx_assessments_skill on public.assessments(skill_id);
create index idx_attempts_user on public.assessment_attempts(user_id);
create index idx_attempts_assessment on public.assessment_attempts(assessment_id, user_id);
create index idx_submissions_user on public.submissions(user_id);
create index idx_submissions_reviewer on public.submissions(reviewer_id, status);
create index idx_submissions_target on public.submissions(kind, target_id);
create index idx_reviews_submission on public.reviews(submission_id);
create index idx_reviews_reviewer on public.reviews(reviewer_id);

-- ============ GRANTS ============
GRANT ALL ON public.topics, public.questions, public.assessments, public.assessment_questions,
  public.assessment_attempts, public.assessment_answers, public.rubrics, public.assignments,
  public.projects, public.submissions, public.submission_files, public.reviews, public.plagiarism_reports TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.topics TO authenticated;
GRANT SELECT (id, skill_id, topic_id, type, prompt, options, explanation, difficulty, points, status, created_by, created_at) ON public.questions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rubrics TO authenticated;
GRANT SELECT ON public.assignments, public.projects TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.assessment_attempts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assessment_answers TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.submissions TO authenticated;
GRANT ALL ON public.submission_files TO authenticated;
GRANT SELECT ON public.reviews TO authenticated;
GRANT SELECT, INSERT ON public.plagiarism_reports TO authenticated;

-- ============ RLS ============
alter table public.topics enable row level security;
alter table public.questions enable row level security;
alter table public.assessments enable row level security;
alter table public.assessment_questions enable row level security;
alter table public.assessment_attempts enable row level security;
alter table public.assessment_answers enable row level security;
alter table public.rubrics enable row level security;
alter table public.assignments enable row level security;
alter table public.projects enable row level security;
alter table public.submissions enable row level security;
alter table public.submission_files enable row level security;
alter table public.reviews enable row level security;
alter table public.plagiarism_reports enable row level security;

create policy "topics_read" on public.topics for select to authenticated using (true);
create policy "topics_admin_write" on public.topics for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "questions_read_cols" on public.questions for select to authenticated using (status = 'active' or public.has_role(auth.uid(), 'admin'));
create policy "questions_admin_write" on public.questions for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "assessments_read_published" on public.assessments for select to authenticated
  using (status = 'published' or public.has_role(auth.uid(), 'admin'));
create policy "assessments_admin_write" on public.assessments for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "aquestions_read" on public.assessment_questions for select to authenticated using (true);
create policy "aquestions_admin_write" on public.assessment_questions for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "attempts_own" on public.assessment_attempts for all to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'))
  with check (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create policy "answers_own_via_attempt" on public.assessment_answers for all to authenticated
  using (exists (select 1 from public.assessment_attempts a where a.id = attempt_id and (a.user_id = auth.uid() or public.has_role(auth.uid(), 'admin'))))
  with check (exists (select 1 from public.assessment_attempts a where a.id = attempt_id and (a.user_id = auth.uid() or public.has_role(auth.uid(), 'admin'))));

create policy "rubrics_read" on public.rubrics for select to authenticated using (true);
create policy "rubrics_admin_write" on public.rubrics for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "assignments_read" on public.assignments for select to authenticated using (true);
create policy "assignments_admin_write" on public.assignments for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "projects_read" on public.projects for select to authenticated using (true);
create policy "projects_admin_write" on public.projects for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "submissions_read" on public.submissions for select to authenticated
  using (user_id = auth.uid() or reviewer_id = auth.uid()
    or public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'reviewer'));
create policy "submissions_insert_own" on public.submissions for insert to authenticated
  with check (user_id = auth.uid());
create policy "submissions_update" on public.submissions for update to authenticated
  using (user_id = auth.uid() or reviewer_id = auth.uid() or public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'reviewer'))
  with check (user_id = auth.uid() or reviewer_id = auth.uid() or public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'reviewer'));
create policy "submissions_delete_own_draft" on public.submissions for delete to authenticated
  using (user_id = auth.uid() and status = 'draft');

create policy "files_via_submission" on public.submission_files for all to authenticated
  using (exists (select 1 from public.submissions s where s.id = submission_id and (s.user_id = auth.uid() or s.reviewer_id = auth.uid() or public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'reviewer'))))
  with check (exists (select 1 from public.submissions s where s.id = submission_id and s.user_id = auth.uid()));

create policy "reviews_read" on public.reviews for select to authenticated
  using (reviewer_id = auth.uid() or public.has_role(auth.uid(), 'admin')
    or exists (select 1 from public.submissions s where s.id = submission_id and (s.user_id = auth.uid() or s.reviewer_id = auth.uid())));
create policy "reviews_write" on public.reviews for insert to authenticated
  with check (reviewer_id = auth.uid() and (public.has_role(auth.uid(), 'reviewer') or public.has_role(auth.uid(), 'admin')));

create policy "plagiarism_read" on public.plagiarism_reports for select to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'reviewer'));
create policy "plagiarism_insert" on public.plagiarism_reports for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'reviewer'));
