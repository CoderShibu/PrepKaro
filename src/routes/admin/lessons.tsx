import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { FileText, PlayCircle, Clock, Plus, Edit2, Trash2 } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

export const Route = createFileRoute('/admin/lessons')({
  component: AdminLessonsPage,
});

function AdminLessonsPage() {
  const { lessons, skills } = usePrepKaroStore();

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
              Content Repository
            </Badge>
            <span className="text-xs text-muted-foreground">• Video & Text Lessons</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Lessons & Content ({lessons.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage instructional lesson notes, downloadable resources, and video stream links.
          </p>
        </div>

        <div className="grid gap-3">
          {lessons.map(lesson => {
            const skill = skills.find(s => s.id === lesson.skillId);
            return (
              <Card key={lesson.id} className="border-border shadow-sm p-4 bg-card">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                        {lesson.contentType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{skill?.title}</span>
                      <span className="text-xs text-muted-foreground">• {lesson.durationMins} mins</span>
                    </div>
                    <h4 className="font-bold text-sm text-foreground">{lesson.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{lesson.content.substring(0, 140)}...</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className="text-[10px]">
                      {lesson.isFreePreview ? 'Free Preview' : 'Protected'}
                    </Badge>
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
