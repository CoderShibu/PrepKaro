# PrepKaro — Build Roadmap

Product brief: user-uploads://PREPKARO_-_MASTER_PRODUCT_BUILD_PROMPT_pasted.md
Decisions confirmed with user: no payments yet (free enrollment), invite-based admin/reviewer provisioning, email verification ON, build all three roles now.

## Phase 1 — Foundation (in progress)
- [x] Cloud & database infrastructure setup
- [x] Enable email/password auth (with email verification)
- [ ] Database schema (identity, learning, assessments, submissions, career, platform) + RLS + GRANTs
- [ ] Design system in src/styles.css (PrepKaro navy/blue palette, Inter)
- [ ] Shared shell: responsive sidebar/header, role-aware nav, breadcrumbs
- [ ] Auth pages: /auth (sign in/up + verify-email state), /reset-password, role=student on signup

## Phase 2 — Student experience
- [ ] Landing page at / (public)
- [ ] Course catalog + course detail + free enrollment
- [ ] Lesson player with sequential skill unlocking (server-side rules)
- [ ] Practice tests: server-scored attempts, attempt limits, results
- [ ] Assignments & projects: submit, resubmit, view feedback
- [ ] My Learning, achievements, notifications, daily tracker
- [ ] Interview prep: mock sessions, Q&A, tips, AI assistant
- [ ] Jobs: listings, filters, saved jobs, applications
- [ ] Resume builder, profile & settings

## Phase 3 — Reviewer workspace
- [ ] Reviewer dashboard, assigned queue, submission review with rubric
- [ ] Approve/reject/request revision + feedback, review history

## Phase 4 — Admin
- [ ] Admin overview + analytics (real DB metrics)
- [ ] Course/skill/lesson CRUD, question bank, assessment builder
- [ ] Assignment/project admin, reviewer invite + assignment
- [ ] Review queue oversight, student management
- [ ] Certificates (issue/verify/revoke) + public /verify page
- [ ] Refund eligibility workflow (no payment provider yet — documented)
- [ ] Jobs admin, audit logs, platform settings

## Phase 5 — Hardening & delivery
- [ ] Seed data migration (demo courses, questions, jobs, interview sets)
- [ ] Admin bootstrap endpoint (setup-token protected) + reviewer invites
- [ ] Tests for core rules (scoring, progression, eligibility)
- [ ] Responsive + accessibility pass, head metadata per route
- [ ] Implementation report (completed features, integrations needing credentials)

## Deferred (documented for the user)
- Payment gateway + real refunds (user decision: no payments yet)
- Real plagiarism provider (adapter boundary, no fake results)
- SMS notifications (no provider configured)
