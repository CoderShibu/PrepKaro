import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Users, Search, Award, CheckCircle2, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';

export const Route = createFileRoute('/admin/students')({
  component: AdminStudentsPage,
});

function AdminStudentsPage() {
  const { profiles, enrollments, certificates, submissions } = usePrepKaroStore();
  const [searchTerm, setSearchTerm] = useState('');

  const students = profiles.filter(p => p.role === 'student');
  const filtered = students.filter(
    s => s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
              Cohort Management
            </Badge>
            <span className="text-xs text-muted-foreground">• Student Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Student Management ({students.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Audit enrolled scholars, verify milestone eligibility, and view submission records.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 shadow-sm">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
            <Input
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filtered.map(student => {
            const studentEnrollments = enrollments.filter(e => e.userId === student.id);
            const studentCerts = certificates.filter(c => c.userId === student.id);
            const studentSubs = submissions.filter(s => s.userId === student.id);

            return (
              <Card key={student.id} className="border-border shadow-sm bg-card p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={student.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'}
                      alt={student.fullName}
                      className="w-12 h-12 rounded-full object-cover border border-border shrink-0"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-foreground">{student.fullName}</h3>
                        <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">Active</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{student.email} • {student.phone || 'Phone verified'}</p>
                      <p className="text-[11px] text-muted-foreground">{student.professionalSummary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                      {studentEnrollments.length} Enrolled
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5 text-blue-500" />
                      {studentSubs.length} Submissions
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {studentCerts.length} Verified Certs
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
