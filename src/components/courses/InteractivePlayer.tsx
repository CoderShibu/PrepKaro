import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import {
  PlayCircle,
  FileText,
  HelpCircle,
  FileCheck2,
  FolderGit2,
  CheckCircle2,
  Lock,
  Clock,
  Award,
  ChevronRight,
  ExternalLink,
  Github,
  Globe,
  UploadCloud,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Share2,
} from 'lucide-react';
import { Course, Skill, Lesson, Assessment, Assignment, Project } from '../../types';
import { usePrepKaroStore } from '../../lib/store';
import { ProgressionEngine, SkillProgressSummary } from '../../lib/progression';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

interface InteractivePlayerProps {
  course: Course;
  initialSkillId?: string;
  initialLessonId?: string;
}

export function InteractivePlayer({
  course,
  initialSkillId,
  initialLessonId,
}: InteractivePlayerProps) {
  const {
    skills,
    lessons,
    completedLessonIds,
    toggleLessonCompletion,
    assessments,
    questions,
    attempts,
    submitAssessmentAttempt,
    assignments,
    projects,
    submissions,
    submitAssignmentOrProject,
    certificates,
    issueCertificate,
    currentUser,
  } = usePrepKaroStore();

  const courseSkills = skills
    .filter(s => s.courseId === course.id)
    .sort((a, b) => a.position - b.position);

  // Active skill selection
  const [selectedSkillId, setSelectedSkillId] = useState<string>(
    initialSkillId || courseSkills[0]?.id || ''
  );

  // Active item mode: 'lesson' | 'test' | 'assignment' | 'project'
  const [activeTab, setActiveTab] = useState<'lesson' | 'test' | 'assignment' | 'project'>('lesson');

  // Selected lesson in current skill
  const skillLessons = lessons
    .filter(l => l.skillId === selectedSkillId)
    .sort((a, b) => a.position - b.position);

  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    initialLessonId || skillLessons[0]?.id || ''
  );

  useEffect(() => {
    if (skillLessons.length > 0 && !skillLessons.some(l => l.id === selectedLessonId)) {
      setSelectedLessonId(skillLessons[0].id);
    }
  }, [selectedSkillId, skillLessons, selectedLessonId]);

  const activeLesson = lessons.find(l => l.id === selectedLessonId) || skillLessons[0];
  const activeSkill = skills.find(s => s.id === selectedSkillId) || courseSkills[0];
  const activeAssessment = assessments.find(a => a.skillId === selectedSkillId);
  const activeAssignment = assignments.find(a => a.skillId === selectedSkillId);
  const activeProject = projects.find(p => p.skillId === selectedSkillId);

  // Completed skills set
  const completedSkillIds = new Set<string>();
  const skillSummaries: Record<string, SkillProgressSummary> = {};

  courseSkills.forEach(s => {
    const unlockStatus = ProgressionEngine.isSkillUnlocked(s, courseSkills, completedSkillIds);
    const summary = ProgressionEngine.getSkillProgress(
      s,
      lessons,
      new Set(completedLessonIds),
      attempts,
      submissions,
      unlockStatus.unlocked,
      unlockStatus.reason
    );
    skillSummaries[s.id] = summary;
    if (summary.isCompleted) {
      completedSkillIds.add(s.id);
    }
  });

  const activeSummary = activeSkill ? skillSummaries[activeSkill.id] : undefined;

  // Practice test state
  const [testAnswers, setTestAnswers] = useState<Record<string, any>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [lastTestResult, setLastTestResult] = useState<{ score: number; passed: boolean } | null>(null);

  // Assignment / Project submission form
  const [repoUrl, setRepoUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [textNotes, setTextNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submissions for this skill
  const currentAssignmentSub = submissions.find(
    s => s.skillId === selectedSkillId && s.kind === 'assignment'
  );
  const currentProjectSub = submissions.find(
    s => s.skillId === selectedSkillId && s.kind === 'project'
  );

  const isCurrentLessonDone = activeLesson ? completedLessonIds.includes(activeLesson.id) : false;

  // Handle assessment submit
  const handleTestSubmit = () => {
    if (!activeAssessment) return;
    try {
      const res = submitAssessmentAttempt(activeAssessment.id, testAnswers);
      setLastTestResult(res);
      setTestSubmitted(true);
      if (res.passed) {
        toast.success(`Passed with ${res.score}%! Skill requirements progressing.`);
      } else {
        toast.error(`Scored ${res.score}%. Minimum ${activeAssessment.passScore}% required to pass.`);
      }
    } catch (e: any) {
      toast.error(e.message || 'Could not record test attempt.');
    }
  };

  // Handle assignment or project submit
  const handleWorkSubmit = (kind: 'assignment' | 'project', target: Assignment | Project) => {
    if (!repoUrl && !textNotes && !demoUrl) {
      toast.error('Please provide a repository link, live demo, or written solution.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitAssignmentOrProject({
        kind,
        targetId: target.id,
        targetTitle: target.title,
        courseId: course.id,
        skillId: selectedSkillId,
        textResponse: textNotes,
        repoUrl: repoUrl || undefined,
        demoUrl: demoUrl || undefined,
        fileName: repoUrl ? 'git-repo' : 'solution.pdf',
      });
      setIsSubmitting(false);
      setTextNotes('');
      toast.success(`${kind === 'assignment' ? 'Assignment' : 'Project'} submitted to reviewer queue!`);
    }, 400);
  };

  // Check course certificate status
  const existingCert = certificates.find(c => c.courseId === course.id && c.userId === currentUser.id);
  const certEligibility = ProgressionEngine.evaluateCertificateEligibility(
    course.id,
    skills,
    lessons,
    new Set(completedLessonIds),
    attempts,
    submissions
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-12rem)]">
      {/* Left: Sequential Syllabus & Skills Navigator */}
      <div className="w-full lg:w-80 shrink-0 space-y-4">
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Course Syllabus
            </span>
            <Badge variant="outline" className="text-xs font-semibold text-blue-600 border-blue-200">
              {completedSkillIds.size} / {courseSkills.length} Skills
            </Badge>
          </div>
          <h2 className="font-bold text-base text-foreground line-clamp-1">{course.title}</h2>
          <div className="w-full bg-muted h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{
                width: `${courseSkills.length > 0 ? (completedSkillIds.size / courseSkills.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        {/* Skills List */}
        <div className="space-y-3">
          {courseSkills.map((skill, index) => {
            const summary = skillSummaries[skill.id];
            const isSelected = skill.id === selectedSkillId;
            const isUnlocked = summary?.isUnlocked;
            const isDone = summary?.isCompleted;

            return (
              <div
                key={skill.id}
                onClick={() => {
                  if (isUnlocked) {
                    setSelectedSkillId(skill.id);
                    setActiveTab('lesson');
                  } else {
                    toast.error(summary?.lockReason || 'Complete prior skill requirements first.');
                  }
                }}
                className={`p-3.5 rounded-xl border transition-all ${
                  !isUnlocked
                    ? 'bg-muted/40 border-border text-muted-foreground cursor-not-allowed opacity-80'
                    : isSelected
                    ? 'bg-blue-50/80 dark:bg-blue-950/30 border-blue-500/50 shadow-sm ring-1 ring-blue-500/20 cursor-pointer'
                    : 'bg-card border-border hover:border-border/80 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Skill {index + 1}
                  </span>
                  {isDone ? (
                    <Badge className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0">
                      Completed
                    </Badge>
                  ) : isUnlocked ? (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      Unlocked
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 gap-1 text-muted-foreground">
                      <Lock className="w-2.5 h-2.5" /> Locked
                    </Badge>
                  )}
                </div>

                <h4 className="font-semibold text-xs sm:text-sm text-foreground mt-1 line-clamp-1">
                  {skill.title}
                </h4>

                {/* Micro indicators */}
                <div className="mt-2.5 pt-2 border-t border-border/60 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <PlayCircle className="w-3 h-3 text-blue-500" />
                    {summary?.lessonsCompleted}/{summary?.lessonsTotal} Lessons
                  </span>
                  {skill.requiresPracticeTest && (
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-amber-500" />
                      {summary?.practiceTestPassed ? 'Quiz Passed' : 'Quiz'}
                    </span>
                  )}
                  {skill.requiresProject && (
                    <span className="flex items-center gap-1">
                      <FolderGit2 className="w-3 h-3 text-teal-600" />
                      {summary?.projectApproved ? 'Project Approved' : 'Project'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificate Eligibility Widget */}
        <div className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-blue-50/50 dark:to-blue-950/20 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-amber-500 shrink-0" />
            <h4 className="font-bold text-xs text-foreground">Certificate Status</h4>
          </div>
          {existingCert ? (
            <div>
              <p className="text-xs text-muted-foreground mb-3">
                Credential verified: <span className="font-mono text-primary font-bold">{existingCert.code}</span>
              </p>
              <Link to={`/verify/${existingCert.code}`}>
                <Button size="sm" variant="outline" className="w-full text-xs h-8 gap-1.5 border-blue-300">
                  <Globe className="w-3 h-3" /> Public Verification
                </Button>
              </Link>
            </div>
          ) : certEligibility.eligible ? (
            <div>
              <p className="text-xs text-emerald-600 font-medium mb-3">
                All 4 milestones achieved! Ready for issuance.
              </p>
              <Button
                size="sm"
                onClick={() => {
                  issueCertificate(course.id, currentUser.id);
                  toast.success('Certificate claimed and generated!');
                }}
                className="w-full text-xs h-8 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Claim Certificate
              </Button>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              {certEligibility.message}
            </p>
          )}
        </div>
      </div>

      {/* Right: Main Learning & Evaluation Player */}
      <div className="flex-1 space-y-4 min-w-0">
        {/* Navigation Tabs for Active Skill */}
        <div className="bg-card border border-border rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                Active Skill Module
              </span>
              <h2 className="text-base sm:text-lg font-bold text-foreground">{activeSkill?.title}</h2>
            </div>
            {activeSummary?.isCompleted && (
              <Badge className="bg-emerald-600 text-white gap-1 text-xs px-2.5 py-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Skill Completed
              </Badge>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={v => setActiveTab(v as any)}>
            <TabsList className="grid grid-cols-4 w-full h-9">
              <TabsTrigger value="lesson" className="text-xs gap-1.5">
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Lessons ({skillLessons.length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="test"
                disabled={!activeSkill?.requiresPracticeTest}
                className="text-xs gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Practice Test</span>
              </TabsTrigger>
              <TabsTrigger
                value="assignment"
                disabled={!activeSkill?.requiresAssignment}
                className="text-xs gap-1.5"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Assignment</span>
              </TabsTrigger>
              <TabsTrigger
                value="project"
                disabled={!activeSkill?.requiresProject}
                className="text-xs gap-1.5"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Project</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* TAB 1: LESSONS PLAYER */}
        {activeTab === 'lesson' && activeLesson && (
          <div className="space-y-4">
            {/* Lesson Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {skillLessons.map((l, i) => {
                const isCurrent = l.id === selectedLessonId;
                const isDone = completedLessonIds.includes(l.id);
                return (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLessonId(l.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 border transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : isDone
                        ? 'bg-card text-foreground border-emerald-300 hover:bg-muted'
                        : 'bg-card text-muted-foreground border-border hover:bg-muted'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-emerald-600'}`} />
                    ) : (
                      <PlayCircle className="w-3.5 h-3.5" />
                    )}
                    <span>Lesson {i + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Video Player or Header */}
            {activeLesson.contentType === 'video' && activeLesson.videoUrl && (
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-border shadow-md">
                <iframe
                  src={activeLesson.videoUrl}
                  title={activeLesson.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Lesson Body Content */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/60">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold">{activeLesson.title}</CardTitle>
                    <CardDescription className="flex items-center gap-3 mt-1 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {activeLesson.durationMins} minutes
                      </span>
                      <span>•</span>
                      <span className="text-foreground font-medium">Text & Visual Walkthrough</span>
                    </CardDescription>
                  </div>

                  <Button
                    onClick={() => {
                      toggleLessonCompletion(activeLesson.id);
                      if (!isCurrentLessonDone) {
                        toast.success('Lesson marked completed!');
                      }
                    }}
                    variant={isCurrentLessonDone ? 'outline' : 'default'}
                    className={`h-9 text-xs font-semibold gap-1.5 ${
                      isCurrentLessonDone
                        ? 'text-emerald-700 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {isCurrentLessonDone ? 'Completed' : 'Mark as Complete'}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-line text-foreground/90">
                  {activeLesson.content}
                </div>

                {/* Lesson Resources */}
                {activeLesson.resources && activeLesson.resources.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Lesson Resources & Code Notes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeLesson.resources.map(res => (
                        <a
                          key={res.id}
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-xs font-medium text-primary transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{res.title}</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 2: PRACTICE TEST / ASSESSMENT ENGINE */}
        {activeTab === 'test' && activeAssessment && (
          <Card className="border-border shadow-sm">
            <CardHeader className="border-b border-border/60">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="outline" className="text-xs text-blue-600 border-blue-200 mb-1">
                    Pass Threshold: {activeAssessment.passScore}%
                  </Badge>
                  <CardTitle className="text-lg font-bold">{activeAssessment.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {activeAssessment.description} ({activeAssessment.timeLimitMins} mins time limit)
                  </CardDescription>
                </div>

                {activeSummary?.practiceTestPassed && (
                  <Badge className="bg-emerald-600 text-white gap-1 text-xs px-2 py-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Test Passed ({activeSummary.practiceTestScore}%)
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              {testSubmitted && lastTestResult && (
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    lastTestResult.passed
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 text-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 text-amber-800 dark:text-amber-300'
                  }`}
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">
                      {lastTestResult.passed ? 'Assessment Passed' : 'Attempt Recorded: Retake Required'}
                    </h4>
                    <p className="text-xs">
                      You scored <span className="font-bold">{lastTestResult.score}%</span>. (Required:{' '}
                      {activeAssessment.passScore}%).
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setTestSubmitted(false);
                      setTestAnswers({});
                    }}
                    className="text-xs h-8 gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Test
                  </Button>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-6">
                {activeAssessment.questionIds.map((qId, qIndex) => {
                  const q = questions.find(item => item.id === qId);
                  if (!q) return null;

                  const userAnswer = testAnswers[q.id];

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl border border-border bg-card/60 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-xs text-blue-600">Question {qIndex + 1}</span>
                        <span className="text-[11px] text-muted-foreground font-mono">{q.points} Points</span>
                      </div>

                      <h4 className="font-semibold text-sm text-foreground">{q.prompt}</h4>

                      {/* Options */}
                      <div className="grid gap-2">
                        {q.options.map(opt => {
                          const isSelected =
                            q.type === 'multi_select'
                              ? Array.isArray(userAnswer) && userAnswer.includes(opt.id)
                              : userAnswer === opt.id;

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                if (testSubmitted) return;
                                if (q.type === 'multi_select') {
                                  const currentArr = Array.isArray(userAnswer) ? userAnswer : [];
                                  const nextArr = currentArr.includes(opt.id)
                                    ? currentArr.filter(id => id !== opt.id)
                                    : [...currentArr, opt.id];
                                  setTestAnswers({ ...testAnswers, [q.id]: nextArr });
                                } else {
                                  setTestAnswers({ ...testAnswers, [q.id]: opt.id });
                                }
                              }}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between ${
                                isSelected
                                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 font-medium text-foreground'
                                  : 'bg-background hover:bg-muted/50 border-input text-foreground'
                              }`}
                            >
                              <span>{opt.text}</span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                  isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-input'
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation after submission */}
                      {testSubmitted && (
                        <div className="mt-3 p-3 rounded-lg bg-muted text-xs space-y-1">
                          <span className="font-bold text-foreground">Explanation:</span>
                          <p className="text-muted-foreground">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!testSubmitted && (
                <div className="flex justify-end pt-4 border-t border-border">
                  <Button
                    onClick={handleTestSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6"
                  >
                    Submit Practice Test
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* TAB 3: ASSIGNMENT PORTAL */}
        {activeTab === 'assignment' && activeAssignment && (
          <div className="space-y-4">
            <Card className="border-border shadow-sm">
              <CardHeader className="border-b border-border/60">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline" className="text-xs text-blue-600 border-blue-200 mb-1">
                      Skill Assignment
                    </Badge>
                    <CardTitle className="text-lg font-bold">{activeAssignment.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      Max file size: {activeAssignment.maxFileMb} MB | Allowed: {activeAssignment.allowedTypes}
                    </CardDescription>
                  </div>

                  {currentAssignmentSub && (
                    <Badge
                      className={`text-xs px-2.5 py-1 ${
                        currentAssignmentSub.status === 'approved'
                          ? 'bg-emerald-600 text-white'
                          : currentAssignmentSub.status === 'revision_requested'
                          ? 'bg-amber-600 text-white'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      Status: {currentAssignmentSub.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-line text-foreground/90 bg-muted/30 p-4 rounded-xl border border-border">
                  {activeAssignment.instructions}
                </div>

                {/* If already submitted and reviewed */}
                {currentAssignmentSub && currentAssignmentSub.status !== 'draft' && (
                  <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-foreground">Reviewer Evaluation</span>
                      {currentAssignmentSub.score && (
                        <span className="font-bold text-sm text-emerald-600">
                          Score: {currentAssignmentSub.score}/100
                        </span>
                      )}
                    </div>
                    {currentAssignmentSub.feedback && (
                      <p className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                        "{currentAssignmentSub.feedback}"
                      </p>
                    )}
                    <div className="text-[11px] text-muted-foreground flex items-center gap-3">
                      <span>Evaluator: {currentAssignmentSub.reviewerName || 'Faculty'}</span>
                      <span>•</span>
                      <span>Plagiarism: {currentAssignmentSub.plagiarismScore}% (Clear)</span>
                    </div>
                  </div>
                )}

                {/* Submission Form */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                    {currentAssignmentSub?.status === 'revision_requested' ? 'Submit Revision' : 'Submit Solution'}
                  </h4>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                        <Github className="w-3.5 h-3.5" /> GitHub Repository URL
                      </label>
                      <Input
                        placeholder="https://github.com/username/project"
                        value={repoUrl}
                        onChange={e => setRepoUrl(e.target.value)}
                        className="text-xs h-9"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" /> Live Demo URL
                      </label>
                      <Input
                        placeholder="https://my-app.vercel.app"
                        value={demoUrl}
                        onChange={e => setDemoUrl(e.target.value)}
                        className="text-xs h-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Technical Notes & Walkthrough</label>
                    <Textarea
                      placeholder="Explain your approach, challenges overcome, and design decisions..."
                      rows={3}
                      value={textNotes}
                      onChange={e => setTextNotes(e.target.value)}
                      className="text-xs"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={() => handleWorkSubmit('assignment', activeAssignment)}
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 gap-2"
                    >
                      <UploadCloud className="w-4 h-4" />
                      {isSubmitting ? 'Uploading...' : 'Submit for Faculty Review'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 4: CASE STUDY PROJECT */}
        {activeTab === 'project' && activeProject && (
          <div className="space-y-4">
            <Card className="border-border shadow-sm">
              <CardHeader className="border-b border-border/60">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline" className="text-xs text-indigo-600 border-indigo-200 mb-1">
                      Capstone Project
                    </Badge>
                    <CardTitle className="text-lg font-bold">{activeProject.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      Portfolio-grade deliverable evaluated with industry rubrics
                    </CardDescription>
                  </div>

                  {currentProjectSub && (
                    <Badge
                      className={`text-xs px-2.5 py-1 ${
                        currentProjectSub.status === 'approved'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      Status: {currentProjectSub.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                <div className="space-y-3 bg-muted/30 p-4 rounded-xl border border-border text-xs">
                  <div>
                    <span className="font-bold text-foreground block">Problem Statement:</span>
                    <p className="text-muted-foreground mt-0.5">{activeProject.brief}</p>
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Objectives:</span>
                    <p className="text-muted-foreground mt-0.5">{activeProject.objectives}</p>
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Deliverables Checklist:</span>
                    <p className="text-muted-foreground mt-0.5 whitespace-pre-line">
                      {activeProject.deliverables}
                    </p>
                  </div>
                </div>

                {/* Project Submission Form */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
                    Submit Project Deliverables
                  </h4>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                        <Github className="w-3.5 h-3.5" /> GitHub Repository URL
                      </label>
                      <Input
                        placeholder="https://github.com/username/project"
                        value={repoUrl}
                        onChange={e => setRepoUrl(e.target.value)}
                        className="text-xs h-9"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" /> Production Demo URL
                      </label>
                      <Input
                        placeholder="https://live-project.dev"
                        value={demoUrl}
                        onChange={e => setDemoUrl(e.target.value)}
                        className="text-xs h-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Architecture & Delivery Summary</label>
                    <Textarea
                      placeholder="Outline system design, trade-offs, and test coverage..."
                      rows={3}
                      value={textNotes}
                      onChange={e => setTextNotes(e.target.value)}
                      className="text-xs"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={() => handleWorkSubmit('project', activeProject)}
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 gap-2"
                    >
                      <UploadCloud className="w-4 h-4" />
                      {isSubmitting ? 'Uploading...' : 'Submit Project for Approval'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
