import { createFileRoute } from '@tanstack/react-router';
import { History, CheckCircle2, XCircle, RotateCcw, Clock } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

export const Route = createFileRoute('/reviewer/history')({
  component: ReviewerHistoryPage,
});

function ReviewerHistoryPage() {
  const { submissions } = usePrepKaroStore();
  const historyList = submissions.filter(s => s.status !== 'under_review' && s.status !== 'draft');

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-teal-100 text-teal-800 text-[10px] px-2 py-0.5 font-semibold">
              Audit Trail
            </Badge>
            <span className="text-xs text-muted-foreground">• Historical Evaluations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Review History
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Log of previously graded student submissions and reviewer feedback.
          </p>
        </div>

        <div className="grid gap-3">
          {historyList.map(sub => (
            <Card key={sub.id} className="border-border shadow-sm bg-card p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-[10px] px-1.5 py-0 ${
                        sub.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sub.status === 'revision_requested'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {sub.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <span className="text-xs font-bold text-foreground">{sub.targetTitle}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Student: {sub.userName} • Score: {sub.score || 0}/100 • Evaluated on{' '}
                    {sub.reviewedAt && new Date(sub.reviewedAt).toLocaleDateString()}
                  </p>
                  {sub.feedback && (
                    <p className="text-xs text-foreground italic bg-muted/40 p-2 rounded mt-1">
                      "{sub.feedback}"
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
