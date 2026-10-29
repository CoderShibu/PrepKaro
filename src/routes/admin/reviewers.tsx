import { createFileRoute } from '@tanstack/react-router';
import { UserCheck, Shield, Clock, FileCheck2 } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

export const Route = createFileRoute('/admin/reviewers')({
  component: AdminReviewersPage,
});

function AdminReviewersPage() {
  const { profiles, submissions } = usePrepKaroStore();
  const reviewers = profiles.filter(p => p.role === 'reviewer');

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
              Faculty Council
            </Badge>
            <span className="text-xs text-muted-foreground">• Reviewer Team</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Reviewer Management ({reviewers.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Oversee designated evaluators, workload allocations, and evaluation turnaround SLAs.
          </p>
        </div>

        <div className="grid gap-4">
          {reviewers.map(rev => {
            const evaluatedCount = submissions.filter(s => s.reviewerId === rev.id).length;

            return (
              <Card key={rev.id} className="border-border shadow-sm bg-card p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={rev.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}
                      alt={rev.fullName}
                      className="w-12 h-12 rounded-full object-cover border border-border shrink-0"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-foreground">{rev.fullName}</h3>
                        <Badge className="bg-teal-100 text-teal-800 text-[10px]">Verified Evaluator</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{rev.email}</p>
                      <p className="text-[11px] text-muted-foreground">{rev.bio}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                    <span className="flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5 text-teal-600" />
                      {evaluatedCount} Submissions Graded
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      SLA: &lt; 24h
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
