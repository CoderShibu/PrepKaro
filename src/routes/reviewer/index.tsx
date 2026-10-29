import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ClipboardCheck,
  ListTodo,
  FileCode2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Github,
  Globe,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { StatsCard } from '../../components/common/StatsCard';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';

export const Route = createFileRoute('/reviewer/')({
  component: ReviewerDashboard,
});

function ReviewerDashboard() {
  const { submissions, currentUser, rubrics } = usePrepKaroStore();

  const pendingSubmissions = submissions.filter(
    s => s.status === 'under_review' || s.status === 'submitted'
  );
  const completedReviews = submissions.filter(s => s.status === 'approved' || s.status === 'rejected');

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0F766E] to-[#115E59] text-white p-6 rounded-2xl shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-white/20 text-white border-white/30 text-[10px] font-semibold gap-1">
                <ClipboardCheck className="w-3 h-3" /> Reviewer Workspace
              </Badge>
              <span className="text-xs text-teal-100">• Faculty Evaluation Portal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Welcome, {currentUser.fullName}!
            </h1>
            <p className="text-xs text-teal-100 max-w-xl">
              You have <strong className="text-white">{pendingSubmissions.length} student submissions</strong> awaiting grading.
            </p>
          </div>

          <Link to="/reviewer/submissions">
            <Button size="sm" className="bg-white text-teal-900 hover:bg-teal-50 font-bold text-xs h-9 px-4 gap-1.5 shadow-sm">
              <FileCode2 className="w-4 h-4" />
              <span>Open Evaluation Queue</span>
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Pending Evaluations"
            value={pendingSubmissions.length}
            subtext="Needs rubric scoring"
            icon={ListTodo}
            accentColor="teal"
          />

          <StatsCard
            title="Completed This Week"
            value={completedReviews.length}
            subtext="Approved or reviewed"
            icon={CheckCircle2}
            accentColor="emerald"
          />

          <StatsCard
            title="Avg Turnaround Time"
            value="14.2 hrs"
            subtext="Target: < 24 hours"
            icon={Clock}
            accentColor="blue"
          />

          <StatsCard
            title="Active Rubrics"
            value={rubrics.length}
            subtext="Standardized scoring"
            icon={ClipboardCheck}
            accentColor="slate"
          />
        </div>

        {/* Priority Assigned Queue Card */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Priority Submissions Queue</CardTitle>
              <CardDescription className="text-xs">
                Student code solutions organized by submission deadline
              </CardDescription>
            </div>
            <Link to="/reviewer/submissions">
              <Button variant="ghost" size="sm" className="text-xs h-8 text-primary">
                View All
              </Button>
            </Link>
          </CardHeader>

          <CardContent className="pt-4 divide-y divide-border/60">
            {pendingSubmissions.map(sub => (
              <div key={sub.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      className={`text-[10px] px-1.5 py-0 font-semibold ${
                        sub.kind === 'assignment' ? 'bg-blue-100 text-blue-800' : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      {sub.kind === 'assignment' ? 'Skill Assignment' : 'Case Study Project'}
                    </Badge>

                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      Attempt {sub.attempt}
                    </Badge>

                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {sub.submittedAt && new Date(sub.submittedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="font-semibold text-sm text-foreground truncate">{sub.targetTitle}</h4>
                  <p className="text-xs text-muted-foreground">
                    Student: <strong className="text-foreground">{sub.userName}</strong> ({sub.userEmail})
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {sub.repoUrl && (
                    <a href={sub.repoUrl} target="_blank" rel="noreferrer">
                      <Button variant="outline" size="sm" className="text-xs h-8 gap-1">
                        <Github className="w-3.5 h-3.5" /> Code
                      </Button>
                    </a>
                  )}

                  <Link to={`/reviewer/submissions`}>
                    <Button size="sm" className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold h-8 px-4 gap-1">
                      <span>Evaluate</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

            {pendingSubmissions.length === 0 && (
              <div className="p-8 text-center text-xs text-muted-foreground space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-semibold text-foreground">Queue clear!</p>
                <p>All student submissions have been evaluated.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
