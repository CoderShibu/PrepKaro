import { createFileRoute } from '@tanstack/react-router';
import { CheckSquare, Clock, RotateCcw, Plus, Eye } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

export const Route = createFileRoute('/admin/assessments')({
  component: AdminAssessmentsPage,
});

function AdminAssessmentsPage() {
  const { assessments, skills } = usePrepKaroStore();

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
              Evaluation Engine
            </Badge>
            <span className="text-xs text-muted-foreground">• Test Configurations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Assessments Builder ({assessments.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Configure passing thresholds, attempt limits, time limits, and randomization rules.
          </p>
        </div>

        <div className="grid gap-4">
          {assessments.map(a => {
            const skill = skills.find(s => s.id === a.skillId);
            return (
              <Card key={a.id} className="border-border shadow-sm p-5 bg-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                        {a.kind.replace('_', ' ')}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{skill?.title}</span>
                      <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">
                        Pass: {a.passScore}%
                      </Badge>
                    </div>
                    <h3 className="font-bold text-sm text-foreground">{a.title}</h3>
                    <p className="text-xs text-muted-foreground">{a.description}</p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                    <span>{a.timeLimitMins} mins limit</span>
                    <span>•</span>
                    <span>Max {a.maxAttempts} attempts</span>
                    <span>•</span>
                    <span>{a.questionIds.length} questions</span>
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
