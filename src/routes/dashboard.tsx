import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  FileCheck2,
  Award,
  Briefcase,
  PlayCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Calendar,
  AlertCircle,
  Flame,
} from 'lucide-react';
import { usePrepKaroStore } from '../lib/store';
import { ProgressionEngine } from '../lib/progression';
import { AppShell } from '../components/layout/AppShell';
import { StatsCard } from '../components/common/StatsCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

export const Route = createFileRoute('/dashboard')({
  component: StudentDashboard,
});

function StudentDashboard() {
  const {
    currentUser,
    courses,
    skills,
    lessons,
    completedLessonIds,
    enrollments,
    attempts,
    submissions,
    certificates,
    jobs,
  } = usePrepKaroStore();

  const userEnrollments = enrollments.filter(e => e.userId === currentUser.id);
  const enrolledCourses = courses.filter(c => userEnrollments.some(e => e.courseId === c.id));
  const primaryCourse = enrolledCourses[0] || courses[0];

  const userCertificates = certificates.filter(c => c.userId === currentUser.id);
  const userSubmissions = submissions.filter(s => s.userId === currentUser.id);
  const pendingSubmissions = userSubmissions.filter(s => s.status === 'under_review');
  const approvedSubmissions = userSubmissions.filter(s => s.status === 'approved');

  // Next action calculation
  const nextAction = primaryCourse
    ? ProgressionEngine.getNextRecommendedAction(
        primaryCourse,
        skills,
        lessons,
        new Set(completedLessonIds),
        attempts,
        submissions,
        userCertificates.find(c => c.courseId === primaryCourse.id)
      )
    : null;

  // Compute completed skills count
  let completedSkillsCount = 0;
  if (primaryCourse) {
    const courseSkills = skills.filter(s => s.courseId === primaryCourse.id);
    courseSkills.forEach(s => {
      const summary = ProgressionEngine.getSkillProgress(
        s,
        lessons,
        new Set(completedLessonIds),
        attempts,
        submissions,
        true
      );
      if (summary.isCompleted) completedSkillsCount++;
    });
  }

  // Avg assessment score
  const userAttempts = attempts.filter(a => a.userId === currentUser.id && a.score !== undefined);
  const avgScore =
    userAttempts.length > 0
      ? Math.round(userAttempts.reduce((acc, a) => acc + (a.score || 0), 0) / userAttempts.length)
      : 95;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0B1F44] to-[#12366B] text-white p-6 rounded-2xl shadow-md">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 text-[11px] font-semibold gap-1">
                <Sparkles className="w-3 h-3" /> Student Overview
              </Badge>
              <span className="text-xs text-slate-300">• Active Cohort 2026</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Welcome back, {currentUser.fullName}!
            </h1>
            <p className="text-xs text-slate-300 max-w-xl">
              You are currently advancing through{' '}
              <span className="text-white font-medium">{primaryCourse?.title}</span>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {primaryCourse && (
              <Link to={`/learn/${primaryCourse.slug}`}>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs h-9 px-4 gap-1.5 shadow-sm">
                  <PlayCircle className="w-4 h-4" />
                  <span>Continue Learning</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Next Action Banner */}
        {nextAction && (
          <Card className="border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm">
            <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                      Next Recommended Action
                    </span>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-blue-300 text-blue-700">
                      Sequential Step
                    </Badge>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-foreground mt-0.5">
                    {nextAction.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{nextAction.description}</p>
                </div>
              </div>

              {nextAction.url && (
                <Link to={nextAction.url} className="shrink-0 w-full sm:w-auto">
                  <Button size="sm" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-8 px-4 gap-1.5">
                    <span>Take Action</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Active Course Progress"
            value="65%"
            subtext="Skill 2 in progress"
            icon={GraduationCap}
            accentColor="blue"
            trend={{ value: '12% this week', isPositive: true }}
          />

          <StatsCard
            title="Skills Completed"
            value={`${completedSkillsCount} / 4`}
            subtext="Verified sequentially"
            icon={BookOpen}
            accentColor="teal"
          />

          <StatsCard
            title="Avg Test Performance"
            value={`${avgScore}%`}
            subtext="Above 70% passing threshold"
            icon={Award}
            accentColor="emerald"
          />

          <StatsCard
            title="Approved Projects"
            value={`${approvedSubmissions.length}`}
            subtext="In public portfolio"
            icon={FileCheck2}
            accentColor="slate"
          />
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Active Courses & Daily Study Tracker */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Enrolled Courses */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Active Courses</CardTitle>
                  <CardDescription className="text-xs">
                    Your enrolled curriculum and progression tracking
                  </CardDescription>
                </div>
                <Link to="/courses">
                  <Button variant="ghost" size="sm" className="text-xs h-8 text-primary">
                    Browse More
                  </Button>
                </Link>
              </CardHeader>

              <CardContent className="pt-4 divide-y divide-border/60">
                {enrolledCourses.map(course => (
                  <div key={course.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={course.coverImageUrl}
                        alt={course.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-border"
                      />
                      <div className="min-w-0">
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 mb-1">
                          {course.category}
                        </Badge>
                        <h4 className="font-semibold text-sm text-foreground truncate">{course.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Faculty: {course.instructorName} • {course.estHours} total hours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0">
                      <div className="text-right sm:mr-2">
                        <span className="text-xs font-bold text-foreground block">65% Complete</span>
                        <span className="text-[10px] text-teal-600 font-medium">Skill 2 Active</span>
                      </div>
                      <Link to={`/learn/${course.slug}`}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-8 px-3">
                          Resume
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Daily Study Tracker */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/60">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold">Daily Study Tracker</CardTitle>
                    <CardDescription className="text-xs">
                      Weekly learning activity and focused study sessions
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-300 font-semibold gap-1">
                    <Calendar className="w-3 h-3" />
                    <Flame className="w-3 h-3" />
                    <span>5-Day Active Streak</span>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-5">
                <div className="grid grid-cols-7 gap-2 text-center">
                  {[
                    { day: 'Mon', hours: '1.5 hrs', active: true, pct: 75 },
                    { day: 'Tue', hours: '2.0 hrs', active: true, pct: 100 },
                    { day: 'Wed', hours: '1.2 hrs', active: true, pct: 60 },
                    { day: 'Thu', hours: '2.5 hrs', active: true, pct: 100 },
                    { day: 'Fri', hours: '1.8 hrs', active: true, pct: 85 },
                    { day: 'Sat', hours: '0.5 hrs', active: true, pct: 30 },
                    { day: 'Sun', hours: 'Today', active: false, pct: 10 },
                  ].map((d, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="h-20 w-full bg-muted/60 rounded-lg relative flex items-end p-1 overflow-hidden">
                        <div
                          className={`w-full rounded transition-all duration-300 ${
                            d.active ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                          style={{ height: `${d.pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-foreground block">{d.day}</span>
                      <span className="text-[10px] text-muted-foreground block truncate">{d.hours}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>Total Study Time: <strong className="text-foreground">9.5 hours</strong> this week</span>
                  <span>Weekly Goal: <strong className="text-foreground">10 hours</strong></span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Col: Pending Reviews, Deadlines, Skill-Matched Jobs */}
          <div className="space-y-6">
            {/* Pending Work & Reviews */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/60">
                <CardTitle className="text-base font-bold">Submissions & Feedback</CardTitle>
                <CardDescription className="text-xs">
                  Your assignments and projects in review
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4 space-y-3">
                {userSubmissions.slice(0, 3).map(sub => (
                  <div key={sub.id} className="p-3 rounded-xl border border-border bg-muted/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`text-[10px] px-1.5 py-0 ${
                          sub.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : sub.status === 'revision_requested'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {sub.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">Attempt {sub.attempt}</span>
                    </div>

                    <h5 className="font-semibold text-xs text-foreground line-clamp-1">
                      {sub.targetTitle}
                    </h5>

                    {sub.feedback && (
                      <p className="text-[11px] text-muted-foreground italic line-clamp-2">
                        "{sub.feedback}"
                      </p>
                    )}
                  </div>
                ))}

                <Link to="/assignments-projects">
                  <Button variant="outline" size="sm" className="w-full text-xs h-8 mt-1">
                    View All Submissions
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Skill-Matched Job Opportunities */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Skill-Matched Jobs</CardTitle>
                  <CardDescription className="text-xs">
                    Roles matching your mastered skills
                  </CardDescription>
                </div>
                <Link to="/jobs">
                  <Button variant="ghost" size="sm" className="text-xs h-8 text-primary p-0">
                    All Jobs
                  </Button>
                </Link>
              </CardHeader>

              <CardContent className="pt-4 space-y-3">
                {jobs.slice(0, 2).map(job => (
                  <div key={job.id} className="p-3 rounded-xl border border-border hover:bg-muted/40 transition-colors space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="font-semibold text-xs text-foreground line-clamp-1">{job.title}</h5>
                        <p className="text-[11px] text-muted-foreground font-medium">{job.company} • {job.location}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-emerald-600 border-emerald-300">
                        100% Match
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
                      <span>{job.salaryRange}</span>
                      <Link to="/jobs" className="text-primary font-semibold hover:underline">
                        Apply Now
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
