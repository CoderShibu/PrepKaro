import { createFileRoute } from '@tanstack/react-router';
import { FolderGit2, FileCheck2, CheckSquare } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

export const Route = createFileRoute('/admin/assignments')({
  component: AdminAssignmentsPage,
});

function AdminAssignmentsPage() {
  const { assignments, projects, skills } = usePrepKaroStore();

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
              Practical Tasks
            </Badge>
            <span className="text-xs text-muted-foreground">• Assignments & Capstones</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Assignment & Project Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Configure practical assignment instructions, case study briefs, and allowed formats.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-base font-bold text-foreground">Skill Assignments ({assignments.length})</h2>
          <div className="grid gap-3">
            {assignments.map(a => (
              <Card key={a.id} className="border-border shadow-sm p-4 bg-card">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">Assignment</Badge>
                    <span className="text-xs text-muted-foreground">Max {a.maxFileMb} MB • {a.allowedTypes}</span>
                  </div>
                  <h4 className="font-bold text-sm text-foreground">{a.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{a.instructions}</p>
                </div>
              </Card>
            ))}
          </div>

          <h2 className="text-base font-bold text-foreground pt-4">Case Study Projects ({projects.length})</h2>
          <div className="grid gap-3">
            {projects.map(p => (
              <Card key={p.id} className="border-border shadow-sm p-4 bg-card">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-indigo-100 text-indigo-800 text-[10px]">Capstone Project</Badge>
                  </div>
                  <h4 className="font-bold text-sm text-foreground">{p.title}</h4>
                  <p className="text-xs text-muted-foreground">{p.brief}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
