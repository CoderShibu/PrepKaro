import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  FileCheck2,
  FolderGit2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Github,
  Globe,
  ExternalLink,
  RotateCcw,
  UploadCloud,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { usePrepKaroStore } from '../lib/store';
import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

export const Route = createFileRoute('/assignments-projects')({
  component: AssignmentsProjectsPage,
});

function AssignmentsProjectsPage() {
  const {
    currentUser,
    submissions,
    assignments,
    projects,
    submitAssignmentOrProject,
  } = usePrepKaroStore();

  const userSubmissions = submissions.filter(s => s.userId === currentUser.id);

  const [activeTab, setActiveTab] = useState<'all' | 'assignments' | 'projects'>('all');
  const [resubmitDialogOpen, setResubmitDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  const [repoUrl, setRepoUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [textNotes, setTextNotes] = useState('');

  const filteredSubs = userSubmissions.filter(s => {
    if (activeTab === 'assignments') return s.kind === 'assignment';
    if (activeTab === 'projects') return s.kind === 'project';
    return true;
  });

  const handleOpenResubmit = (sub: any) => {
    setSelectedSubmission(sub);
    setRepoUrl(sub.repoUrl || '');
    setDemoUrl(sub.demoUrl || '');
    setTextNotes('');
    setResubmitDialogOpen(true);
  };

  const handleSaveResubmit = () => {
    if (!selectedSubmission) return;

    submitAssignmentOrProject({
      kind: selectedSubmission.kind,
      targetId: selectedSubmission.targetId,
      targetTitle: selectedSubmission.targetTitle,
      courseId: selectedSubmission.courseId || 'course-1',
      skillId: selectedSubmission.skillId || 'skill-1-1',
      textResponse: textNotes,
      repoUrl: repoUrl || undefined,
      demoUrl: demoUrl || undefined,
    });

    setResubmitDialogOpen(false);
    toast.success('Revised submission sent to reviewer queue!');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
                Practical Deliverables
              </Badge>
              <span className="text-xs text-muted-foreground">• Faculty Evaluated</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Assignments & Projects
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Review submission statuses, faculty rubric evaluations, and manage project revisions.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={v => setActiveTab(v as any)}>
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs">All Deliverables ({userSubmissions.length})</TabsTrigger>
              <TabsTrigger value="assignments" className="text-xs">Assignments</TabsTrigger>
              <TabsTrigger value="projects" className="text-xs">Case Study Projects</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Submissions List */}
        <div className="grid gap-4">
          {filteredSubs.map(sub => (
            <Card key={sub.id} className="border-border shadow-sm overflow-hidden bg-card">
              <CardContent className="p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        className={`text-[10px] px-2 py-0.5 font-semibold ${
                          sub.kind === 'assignment'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-teal-100 text-teal-800'
                        }`}
                      >
                        {sub.kind === 'assignment' ? 'Skill Assignment' : 'Case Study Project'}
                      </Badge>

                      <Badge
                        className={`text-[10px] px-2 py-0.5 font-semibold ${
                          sub.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : sub.status === 'revision_requested'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {sub.status.replace('_', ' ').toUpperCase()}
                      </Badge>

                      <span className="text-[11px] text-muted-foreground">Attempt {sub.attempt}</span>
                    </div>

                    <h3 className="font-bold text-base text-foreground mt-1">{sub.targetTitle}</h3>
                  </div>

                  {sub.score !== undefined && (
                    <div className="text-right shrink-0">
                      <span className="text-xs text-muted-foreground block">Evaluation Score</span>
                      <span className="text-xl font-extrabold text-emerald-600">{sub.score} / 100</span>
                    </div>
                  )}
                </div>

                {/* Submission Content Links */}
                <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 flex flex-wrap items-center gap-4 text-xs">
                  {sub.repoUrl && (
                    <a
                      href={sub.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 font-medium text-primary hover:underline"
                    >
                      <Github className="w-4 h-4 text-foreground" />
                      <span>Repository Link</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </a>
                  )}

                  {sub.demoUrl && (
                    <a
                      href={sub.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 font-medium text-teal-600 hover:underline"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Live Demo URL</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </a>
                  )}

                  {sub.plagiarismScore !== undefined && (
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Code Plagiarism: {sub.plagiarismScore}% (Clear)</span>
                    </span>
                  )}
                </div>

                {/* Reviewer Feedback & Rubric Breakdown */}
                {sub.feedback && (
                  <div className="p-4 rounded-xl border border-border bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-foreground">
                      <span>Evaluator Comments from {sub.reviewerName || 'Faculty Reviewer'}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {sub.reviewedAt && new Date(sub.reviewedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                      "{sub.feedback}"
                    </p>

                    {/* Rubric scores if present */}
                    {sub.rubricScores && (
                      <div className="pt-2 border-t border-border/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                        {Object.entries(sub.rubricScores).map(([critId, pts]) => (
                          <div key={critId} className="p-1.5 rounded bg-background border border-border">
                            <span className="text-muted-foreground block text-[10px] uppercase">Criterion</span>
                            <span className="font-bold text-foreground">{pts} Points</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Revision action if revision was requested */}
                {sub.status === 'revision_requested' && (
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 font-medium">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Action required: resubmit revised implementation to satisfy requirements.</span>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleOpenResubmit(sub)}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold h-8 gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Resubmit Revision</span>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resubmit Dialog */}
        <Dialog open={resubmitDialogOpen} onOpenChange={setResubmitDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">Resubmit Revision</DialogTitle>
              <DialogDescription className="text-xs">
                Provide updated repository links or notes addressing reviewer feedback for "{selectedSubmission?.targetTitle}".
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">GitHub Repository URL</label>
                <Input
                  value={repoUrl}
                  onChange={e => setRepoUrl(e.target.value)}
                  className="text-xs h-9"
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Live Demo URL</label>
                <Input
                  value={demoUrl}
                  onChange={e => setDemoUrl(e.target.value)}
                  className="text-xs h-9"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Revision Changes Description</label>
                <Textarea
                  value={textNotes}
                  onChange={e => setTextNotes(e.target.value)}
                  className="text-xs"
                  rows={3}
                  placeholder="Explain the fixes applied based on reviewer feedback..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setResubmitDialogOpen(false)} className="text-xs h-8">
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveResubmit} className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                Send to Reviewer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
