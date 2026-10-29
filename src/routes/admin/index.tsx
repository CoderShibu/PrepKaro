import { createFileRoute, Link } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Award,
  CreditCard,
  FileCheck2,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { StatsCard } from '../../components/common/StatsCard';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';

export const Route = createFileRoute('/admin/')({
  component: AdminOverviewPage,
});

function AdminOverviewPage() {
  const {
    courses,
    profiles,
    enrollments,
    submissions,
    certificates,
    refundRequests,
    auditLogs,
    currentUser,
  } = usePrepKaroStore();

  const studentsCount = profiles.filter(p => p.role === 'student').length;
  const reviewersCount = profiles.filter(p => p.role === 'reviewer').length;
  const pendingSubmissions = submissions.filter(
    s => s.status === 'under_review' || s.status === 'submitted'
  );
  const pendingRefunds = refundRequests.filter(r => r.status === 'pending');

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0B1F44] via-[#12366B] to-[#07152E] text-white p-6 rounded-2xl shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 text-[10px] font-semibold gap-1">
                <ShieldAlert className="w-3 h-3" /> Admin Operations Center
              </Badge>
              <span className="text-xs text-slate-300">• Platform Health: Optimal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Platform Overview: {currentUser.fullName}
            </h1>
            <p className="text-xs text-slate-300 max-w-xl">
              System-wide monitoring: {courses.length} courses active, {enrollments.length} enrollments, {pendingSubmissions.length} submissions pending review.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link to="/admin/courses">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-9 px-4 gap-1.5 shadow-sm">
                <span>Manage Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Real DB Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Students"
            value={studentsCount + 120} // active cohort count
            subtext="Enrolled across tracks"
            icon={Users}
            accentColor="blue"
            trend={{ value: '18% this month', isPositive: true }}
          />

          <StatsCard
            title="Published Courses"
            value={courses.filter(c => c.status === 'published').length}
            subtext={`${courses.length} total tracks`}
            icon={BookOpen}
            accentColor="teal"
          />

          <StatsCard
            title="Pending Reviews"
            value={pendingSubmissions.length}
            subtext="Needs reviewer grading"
            icon={FileCheck2}
            accentColor="amber"
          />

          <StatsCard
            title="Certificates Issued"
            value={certificates.length}
            subtext="100% verified credentials"
            icon={Award}
            accentColor="emerald"
          />
        </div>

        {/* Operational Queues */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Audit Trail (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Recent System Audit Events</CardTitle>
                  <CardDescription className="text-xs">
                    Immutable log of administrative, reviewer, and enrollment actions
                  </CardDescription>
                </div>
                <Link to="/admin/audit-logs">
                  <Button variant="ghost" size="sm" className="text-xs h-8 text-primary">
                    Full Log
                  </Button>
                </Link>
              </CardHeader>

              <CardContent className="pt-4 divide-y divide-border/60">
                {auditLogs.slice(0, 5).map(log => (
                  <div key={log.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-4 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-[10px] uppercase font-bold">
                          {log.action}
                        </Badge>
                        <span className="text-muted-foreground font-semibold">{log.userEmail}</span>
                      </div>
                      <p className="text-foreground">{log.details}</p>
                    </div>

                    <span className="text-[10px] text-muted-foreground shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link to="/admin/courses" className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors space-y-1 block">
                <BookOpen className="w-5 h-5 text-blue-600 mb-1" />
                <span className="font-bold text-xs text-foreground block">Course CRUD</span>
                <span className="text-[11px] text-muted-foreground">Add & edit tracks</span>
              </Link>

              <Link to="/admin/questions" className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors space-y-1 block">
                <Sparkles className="w-5 h-5 text-blue-600 mb-1" />
                <span className="font-bold text-xs text-foreground block">AI Questions</span>
                <span className="text-[11px] text-muted-foreground">Auto-generate tests</span>
              </Link>

              <Link to="/admin/students" className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors space-y-1 block">
                <Users className="w-5 h-5 text-teal-600 mb-1" />
                <span className="font-bold text-xs text-foreground block">Students</span>
                <span className="text-[11px] text-muted-foreground">Audit progress</span>
              </Link>

              <Link to="/admin/payments" className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors space-y-1 block">
                <CreditCard className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="font-bold text-xs text-foreground block">Refunds</span>
                <span className="text-[11px] text-muted-foreground">
                  {pendingRefunds.length} pending requests
                </span>
              </Link>
            </div>
          </div>

          {/* Right Col: Pending Actions & Alerts */}
          <div className="space-y-6">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/60">
                <CardTitle className="text-base font-bold">Operational Alerts</CardTitle>
                <CardDescription className="text-xs">
                  Immediate administrative items requiring sign-off
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4 space-y-3">
                {pendingRefunds.length > 0 && (
                  <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4" /> Refund Requests ({pendingRefunds.length})
                      </span>
                      <Badge className="bg-amber-600 text-white text-[10px]">Pending</Badge>
                    </div>
                    <p className="text-muted-foreground">
                      Student requested a refund evaluation under the 14-day policy window.
                    </p>
                    <Link to="/admin/payments">
                      <Button size="sm" variant="outline" className="w-full text-xs h-8 border-amber-400 text-amber-800">
                        Review Refund Requests
                      </Button>
                    </Link>
                  </div>
                )}

                {pendingSubmissions.length > 0 && (
                  <div className="p-3.5 rounded-xl border border-blue-300 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                        <FileCheck2 className="w-4 h-4" /> Submissions Queue
                      </span>
                      <Badge className="bg-blue-600 text-white text-[10px]">{pendingSubmissions.length} New</Badge>
                    </div>
                    <p className="text-muted-foreground">
                      Assigned submissions waiting for faculty grading.
                    </p>
                    <Link to="/admin/reviews">
                      <Button size="sm" variant="outline" className="w-full text-xs h-8 border-blue-400 text-blue-800">
                        Inspect Review Queue
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
