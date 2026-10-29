-- ============ PrepKaro migration 0002: RLS Security Hardening & Performance Indexes ============

-- 1. Tighten Submissions RLS: Reviewers only see submissions ASSIGNED to them
drop policy if exists "submissions_read" on public.submissions;
create policy "submissions_read" on public.submissions for select to authenticated
  using (
    user_id = auth.uid() -- Student sees their own
    or reviewer_id = auth.uid() -- Assigned reviewer sees their assigned submission
    or public.has_role(auth.uid(), 'admin') -- Platform Admin sees all
  );

drop policy if exists "submissions_update" on public.submissions;
create policy "submissions_update" on public.submissions for update to authenticated
  using (
    (user_id = auth.uid() and status in ('draft', 'revision_requested')) -- Student can only update draft or requested revisions
    or (reviewer_id = auth.uid()) -- Assigned reviewer can update their assigned record
    or public.has_role(auth.uid(), 'admin') -- Admin
  )
  with check (
    (user_id = auth.uid() and status in ('draft', 'submitted'))
    or (reviewer_id = auth.uid())
    or public.has_role(auth.uid(), 'admin')
  );

-- 2. Tighten Reviews RLS: Only assigned reviewer or admin can create/modify reviews
drop policy if exists "reviews_read" on public.reviews;
create policy "reviews_read" on public.reviews for select to authenticated
  using (
    reviewer_id = auth.uid()
    or public.has_role(auth.uid(), 'admin')
    or exists (
      select 1 from public.submissions s
      where s.id = submission_id and s.user_id = auth.uid()
    )
  );

drop policy if exists "reviews_write" on public.reviews;
create policy "reviews_write" on public.reviews for insert to authenticated
  with check (
    (reviewer_id = auth.uid() and public.has_role(auth.uid(), 'reviewer'))
    or public.has_role(auth.uid(), 'admin')
  );

-- 3. Plagiarism report visibility: strictly admin and assigned reviewer
drop policy if exists "plagiarism_read" on public.plagiarism_reports;
create policy "plagiarism_read" on public.plagiarism_reports for select to authenticated
  using (
    public.has_role(auth.uid(), 'admin')
    or exists (
      select 1 from public.submissions s
      where s.id = submission_id and s.reviewer_id = auth.uid()
    )
  );

-- 4. High-performance B-tree indexes on foreign keys & filter columns
create index if not exists idx_skills_course_id on public.skills(course_id);
create index if not exists idx_skills_position on public.skills(course_id, position);
create index if not exists idx_lessons_skill_id on public.lessons(skill_id);
create index if not exists idx_lessons_position on public.lessons(skill_id, position);

create index if not exists idx_enrollments_user_id on public.enrollments(user_id);
create index if not exists idx_enrollments_course_id on public.enrollments(course_id);
create index if not exists idx_enrollments_status on public.enrollments(status);

create index if not exists idx_lesson_progress_user_lesson on public.lesson_progress(user_id, lesson_id);
create index if not exists idx_skill_progress_user_skill on public.skill_progress(user_id, skill_id);

create index if not exists idx_assessment_attempts_user_id on public.assessment_attempts(user_id);
create index if not exists idx_assessment_attempts_assessment_id on public.assessment_attempts(assessment_id);
create index if not exists idx_assessment_attempts_passed on public.assessment_attempts(assessment_id, passed);

create index if not exists idx_submissions_user_id on public.submissions(user_id);
create index if not exists idx_submissions_reviewer_id on public.submissions(reviewer_id);
create index if not exists idx_submissions_course_skill on public.submissions(course_id, skill_id);
create index if not exists idx_submissions_status on public.submissions(status);

create index if not exists idx_reviews_submission_id on public.reviews(submission_id);
create index if not exists idx_reviews_reviewer_id on public.reviews(reviewer_id);

create index if not exists idx_notifications_user_read on public.notifications(user_id, is_read);
create index if not exists idx_courses_status on public.courses(status);
