import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Layers, Plus, CheckCircle2, Lock, ArrowUpDown, Trash2, Edit2 } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/skills')({
  component: AdminSkillsPage,
});

function AdminSkillsPage() {
  const { courses, skills } = usePrepKaroStore();
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');

  const courseSkills = skills
    .filter(s => s.courseId === selectedCourseId)
    .sort((a, b) => a.position - b.position);

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
                Curriculum Design
              </Badge>
              <span className="text-xs text-muted-foreground">• Sequential Skill Trees</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Skills & Curriculum Ordering
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Manage sequential skill prerequisites, required milestones, and pass thresholds per course.
            </p>
          </div>

          <div className="w-64">
            <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map(c => (
                  <SelectItem key={c.id} value={c.id} className="text-xs">
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {courseSkills.map((skill, index) => (
            <Card key={skill.id} className="border-border shadow-sm bg-card p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] font-bold">
                      Position {index}
                    </Badge>
                    {index === 0 ? (
                      <Badge className="bg-blue-100 text-blue-800 text-[10px]">Unconditional Unlock</Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] gap-1 text-muted-foreground">
                        <Lock className="w-2.5 h-2.5" /> Requires Skill {index}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground font-mono">Pass threshold: {skill.passScore}%</span>
                  </div>

                  <h3 className="font-bold text-base text-foreground mt-1">{skill.title}</h3>
                  <p className="text-xs text-muted-foreground">{skill.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-lg border border-border">
                    <span>Quiz: {skill.requiresPracticeTest ? 'Yes' : 'No'}</span>
                    <span>•</span>
                    <span>Assignment: {skill.requiresAssignment ? 'Yes' : 'No'}</span>
                    <span>•</span>
                    <span>Project: {skill.requiresProject ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
