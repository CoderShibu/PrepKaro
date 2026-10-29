import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ListTodo,
  Clock,
  Github,
  Globe,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

export const Route = createFileRoute('/reviewer/assigned')({
  component: ReviewerAssignedPage,
});

function ReviewerAssignedPage() {
  const { submissions } = usePrepKaroStore();
  const pendingSubmissions = submissions.filter(
    s => s.status === 'under_review' || s.status === 'submitted'
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-teal-100 text-teal-800 text-[10px] px-2 py-0.5 font-semibold">
                Workload Management
              </Badge>
              <span className="text-xs text-muted-foreground">• Assigned Queue</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Assigned Reviews ({pendingSubmissions.length})
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Submissions allocated to your faculty queue requiring rubric evaluation.
            </p>
          </div>

          <Link to="/reviewer/submissions">
            <Button size="sm" className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold h-8">
              Open Evaluation Workspace
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {pendingSubmissions.map(sub => (
            <Card key={sub.id} className="border-border shadow-sm bg-card p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] font-semibold">
                      {sub.kind === 'assignment' ? 'Assignment' : 'Capstone Project'}
                    </Badge>
                    <span className="text-xs font-semibold text-foreground">{sub.userName}</span>
                    <span className="text-xs text-muted-foreground">({sub.userEmail})</span>
                  </div>
                  <h3 className="font-bold text-sm text-foreground">{sub.targetTitle}</h3>
                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Submitted {sub.submittedAt && new Date(sub.submittedAt).toLocaleDateString()}
                    </span>
                    <span>Attempt {sub.attempt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {sub.repoUrl && (
                    <a href={sub.repoUrl} target="_blank" rel="noreferrer">
                      <Button variant="outline" size="sm" className="text-xs h-8 gap-1">
                        <Github className="w-3.5 h-3.5" /> Code
                      </Button>
                    </a>
                  )}
                  <Link to="/reviewer/submissions">
                    <Button size="sm" className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold h-8 px-4 gap-1">
                      <span>Evaluate</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}

          {pendingSubmissions.length === 0 && (
            <div className="p-12 text-center border border-dashed border-border rounded-xl bg-card space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-xs text-muted-foreground">No pending assigned submissions.</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
