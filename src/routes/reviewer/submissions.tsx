import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  FileCode2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Github,
  Globe,
  ExternalLink,
  ShieldCheck,
  Award,
  AlertTriangle,
  User,
  Clock,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { Submission, Rubric } from '../../lib/types';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Textarea } from '../../components/ui/textarea';
import { Slider } from '../../components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';
import { toast } from 'sonner';

export const Route = createFileRoute('/reviewer/submissions')({
  component: ReviewerSubmissionsPage,
});

function ReviewerSubmissionsPage() {
  const { submissions, rubrics, gradeSubmission, currentUser } = usePrepKaroStore();

  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(
    submissions.find(s => s.status === 'under_review' || s.status === 'submitted') || submissions[0] || null
  );

  const defaultRubric = rubrics[0];

  // Rubric scores state
  const [rubricScores, setRubricScores] = useState<Record<string, number>>({
    'crit-1': 22,
    'crit-2': 23,
    'crit-3': 26,
    'crit-4': 18,
  });

  const [writtenFeedback, setWrittenFeedback] = useState(
    'Strong architectural structure and clean separation of concerns. Generics are properly typed and tests execute without errors.'
  );

  const [confirmDecisionOpen, setConfirmDecisionOpen] = useState(false);
  const [pendingDecision, setPendingDecision] = useState<'approved' | 'rejected' | 'revision_requested'>('approved');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPointsEarned = Object.values(rubricScores).reduce((a, b) => a + b, 0);

  const handleStartDecision = (decision: 'approved' | 'rejected' | 'revision_requested') => {
    if (!writtenFeedback.trim()) {
      toast.error('Please provide written evaluation comments for the student.');
      return;
    }
    setPendingDecision(decision);
    setConfirmDecisionOpen(true);
  };

  const handleConfirmDecision = () => {
    if (!selectedSubmission || isSubmitting) return;

    setIsSubmitting(true);
    try {
      gradeSubmission(
        selectedSubmission.id,
        pendingDecision,
        writtenFeedback,
        rubricScores
      );

      setConfirmDecisionOpen(false);
      toast.success(`Submission marked as ${pendingDecision.toUpperCase()}! Student notified.`);

      // Switch to next pending if any
      const remainingPending = submissions.filter(
        s => (s.status === 'under_review' || s.status === 'submitted') && s.id !== selectedSubmission.id
      );
      if (remainingPending.length > 0) {
        setSelectedSubmission(remainingPending[0]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-teal-100 text-teal-800 text-[10px] px-2 py-0.5 font-semibold">
                Grading Workspace
              </Badge>
              <span className="text-xs text-muted-foreground">• Standardized Rubrics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Submission Evaluation
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Review student code repositories, score against evaluation criteria, and approve milestones.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Submissions Queue List */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
              Submissions Queue ({submissions.length})
            </span>

            <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
              {submissions.map(sub => {
                const isSelected = selectedSubmission?.id === sub.id;
                return (
                  <div
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubmission(sub);
                      if (sub.rubricScores) {
                        setRubricScores(sub.rubricScores);
                      }
                      if (sub.feedback) {
                        setWrittenFeedback(sub.feedback);
                      }
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 shadow-sm ring-1 ring-blue-500/20'
                        : 'bg-card border-border hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`text-[10px] px-1.5 py-0 font-semibold ${
                          sub.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : sub.status === 'revision_requested'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {sub.status.replace('_', ' ').toUpperCase()}
                      </Badge>

                      <span className="text-[10px] text-muted-foreground">Attempt {sub.attempt}</span>
                    </div>

                    <h4 className="font-bold text-xs text-foreground mt-1 line-clamp-1">
                      {sub.targetTitle}
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      {sub.userName} • {sub.kind}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 2 Columns: Detailed Evaluation Form */}
          {selectedSubmission ? (
            <div className="lg:col-span-2 space-y-6">
              {/* Submission Overview Card */}
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3 border-b border-border/60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <Badge variant="outline" className="text-xs text-primary border-blue-300 mb-1">
                        {selectedSubmission.kind === 'assignment' ? 'Skill Assignment' : 'Case Study Project'}
                      </Badge>
                      <CardTitle className="text-lg font-bold">{selectedSubmission.targetTitle}</CardTitle>
                      <CardDescription className="text-xs">
                        Submitted by <strong>{selectedSubmission.userName}</strong> ({selectedSubmission.userEmail}) • Attempt {selectedSubmission.attempt}
                      </CardDescription>
                    </div>

                    <Badge
                      className={`text-xs px-2.5 py-1 ${
                        selectedSubmission.status === 'approved'
                          ? 'bg-emerald-600 text-white'
                          : selectedSubmission.status === 'revision_requested'
                          ? 'bg-amber-600 text-white'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {selectedSubmission.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-5 space-y-4 text-xs">
                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
                    {selectedSubmission.repoUrl && (
                      <a
                        href={selectedSubmission.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 font-semibold text-primary hover:underline"
                      >
                        <Github className="w-4 h-4 text-foreground" />
                        <span>Inspect Repository Code</span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                      </a>
                    )}

                    {selectedSubmission.demoUrl && (
                      <a
                        href={selectedSubmission.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 font-semibold text-teal-600 hover:underline"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Open Live Demo</span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                      </a>
                    )}

                    <span className="flex items-center gap-1.5 text-muted-foreground ml-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Plagiarism Scan: {selectedSubmission.plagiarismScore || 4}% (Clear)</span>
                    </span>
                  </div>

                  {/* Student Walkthrough Notes */}
                  {selectedSubmission.textResponse && (
                    <div className="space-y-1">
                      <span className="font-semibold text-foreground block">Student Description & Architecture Notes:</span>
                      <p className="p-3 rounded-lg bg-muted/50 border border-border leading-relaxed text-muted-foreground">
                        {selectedSubmission.textResponse}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Rubric Evaluation Scoring */}
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold">Standardized Rubric Scoring</CardTitle>
                    <CardDescription className="text-xs">
                      Adjust points according to code quality, architecture, and requirements
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">Total Score</span>
                    <span className="text-lg font-black text-emerald-600">{totalPointsEarned} / 100</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-5 space-y-5">
                  {defaultRubric.criteria.map(crit => {
                    const currentPoints = rubricScores[crit.id] ?? crit.maxPoints;

                    return (
                      <div key={crit.id} className="p-3.5 rounded-xl border border-border bg-card/60 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-xs text-foreground">{crit.name}</h4>
                            <p className="text-[11px] text-muted-foreground">{crit.description}</p>
                          </div>
                          <Badge variant="outline" className="text-xs font-mono font-bold">
                            {currentPoints} / {crit.maxPoints} pts
                          </Badge>
                        </div>

                        <Slider
                          value={[currentPoints]}
                          max={crit.maxPoints}
                          step={1}
                          onValueChange={vals => setRubricScores({ ...rubricScores, [crit.id]: vals[0] })}
                          className="pt-1"
                        />
                      </div>
                    );
                  })}

                  {/* Written Feedback Textarea */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-bold text-foreground block">
                      Written Feedback & Actionable Recommendations
                    </label>
                    <Textarea
                      rows={4}
                      value={writtenFeedback}
                      onChange={e => setWrittenFeedback(e.target.value)}
                      placeholder="Explain what was done well and any necessary revisions..."
                      className="text-xs font-sans"
                    />
                  </div>

                  {/* Decision Action Buttons */}
                  <div className="pt-4 border-t border-border flex flex-wrap items-center justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleStartDecision('revision_requested')}
                      className="text-xs h-9 border-amber-300 text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20 gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Request Revision</span>
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleStartDecision('rejected')}
                      className="text-xs h-9 border-rose-300 text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </Button>

                    <Button
                      onClick={() => handleStartDecision('approved')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-9 px-6 gap-1.5 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Submission</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="lg:col-span-2 p-12 text-center border border-dashed border-border rounded-xl bg-card">
              <p className="text-xs text-muted-foreground">Select a submission from the queue to start review.</p>
            </div>
          )}
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={confirmDecisionOpen} onOpenChange={setConfirmDecisionOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">
                Confirm {pendingDecision.replace('_', ' ').toUpperCase()} Decision
              </DialogTitle>
              <DialogDescription className="text-xs">
                You are about to submit an evaluation score of <strong>{totalPointsEarned}/100</strong> for{' '}
                <strong>{selectedSubmission?.userName}</strong>.
              </DialogDescription>
            </DialogHeader>

            <div className="p-3 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground">
              {pendingDecision === 'approved' ? (
                <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                  Approving satisfies this student's milestone and unlocks their next sequential skill.
                </p>
              ) : pendingDecision === 'revision_requested' ? (
                <p className="text-amber-700 dark:text-amber-400 font-medium">
                  Student will be notified to revise their code and resubmit according to your feedback.
                </p>
              ) : (
                <p className="text-rose-700 dark:text-rose-400 font-medium">
                  Rejection recorded. Constructive feedback is required.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setConfirmDecisionOpen(false)} className="text-xs h-8">
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmDecision}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
              >
                {isSubmitting ? 'Recording...' : 'Confirm & Record'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
