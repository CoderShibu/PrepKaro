import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Briefcase, Plus, Search, Building, MapPin } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { JobListing } from '../../lib/types';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

export const Route = createFileRoute('/admin/jobs')({
  component: AdminJobsPage,
});

function AdminJobsPage() {
  const { jobs } = usePrepKaroStore();

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
              Employer Relations
            </Badge>
            <span className="text-xs text-muted-foreground">• Job Openings Admin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Job Listings Management ({jobs.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage partner job vacancies, skill requirements, and candidate application metrics.
          </p>
        </div>

        <div className="grid gap-4">
          {jobs.map(job => (
            <Card key={job.id} className="border-border shadow-sm bg-card p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">{job.status.toUpperCase()}</Badge>
                    <Badge variant="secondary" className="text-[10px]">{job.workMode}</Badge>
                    <span className="font-bold text-foreground text-sm">{job.title}</span>
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {job.company} • {job.location} • {job.salaryRange}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {job.requiredSkills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-muted text-[10px] border border-border">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <Badge variant="outline" className="text-xs font-semibold">
                    {job.applicationsCount} Applications
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
