import { createFileRoute } from '@tanstack/react-router';
import { FileCheck2, ShieldCheck, CheckCircle2, RotateCcw, XCircle, Clock } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

export const Route = createFileRoute('/admin/reviews')({
  component: AdminReviewsOversightPage,
});

function AdminReviewsOversightPage() {
  const { submissions } = usePrepKaroStore();

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
              Quality Assurance
            </Badge>
            <span className="text-xs text-muted-foreground">• Review Oversight</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Submission Reviews Oversight ({submissions.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Platform-wide oversight of student project evaluations, rubric scores, and plagiarism scans.
          </p>
        </div>

        <div className="grid gap-3">
          {submissions.map(sub => (
            <Card key={sub.id} className="border-border shadow-sm p-4 bg-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
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
                    <span className="font-bold text-foreground">{sub.targetTitle}</span>
                  </div>
                  <p className="text-muted-foreground">
                    Student: <strong className="text-foreground">{sub.userName}</strong> • Evaluator: {sub.reviewerName || 'Unassigned'}
                  </p>
                  {sub.feedback && (
                    <p className="text-foreground italic bg-muted/40 p-2 rounded">
                      "{sub.feedback}"
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="text-muted-foreground block text-[11px]">Score</span>
                  <span className="font-bold text-sm text-emerald-600">{sub.score !== undefined ? `${sub.score}/100` : 'Pending'}</span>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Plagiarism: {sub.plagiarismScore || 3}%</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
