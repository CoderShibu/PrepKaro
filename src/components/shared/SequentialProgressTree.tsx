import { CheckCircle2, Lock, ChevronRight, PlayCircle, HelpCircle, FileCheck2, FolderGit2, Award } from 'lucide-react';
import { Badge } from '../ui/badge';
import { SkillProgressSummary } from '../../lib/progression';

interface SequentialStepProps {
  number: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'in_progress' | 'locked';
  icon: any;
  lockReason?: string;
  onClick?: () => void;
}

export function SequentialStep({
  number,
  title,
  subtitle,
  status,
  icon: Icon,
  lockReason,
  onClick,
}: SequentialStepProps) {
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in_progress';
  const isLocked = status === 'locked';

  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className={`relative flex items-start gap-4 p-4 rounded-xl border transition-all ${
        isLocked
          ? 'bg-muted/40 border-border text-muted-foreground opacity-75 cursor-not-allowed'
          : isInProgress
          ? 'bg-card border-blue-500/50 shadow-sm shadow-blue-500/10 ring-1 ring-blue-500/20 cursor-pointer hover:border-blue-500'
          : 'bg-card border-border hover:border-border/80 cursor-pointer'
      }`}
    >
      {/* Icon status indicator */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
          isCompleted
            ? 'bg-emerald-500/15 text-emerald-600'
            : isInProgress
            ? 'bg-blue-600 text-white'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        ) : isLocked ? (
          <Lock className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Icon className="w-5 h-5 text-white" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            Step {number}
          </span>
          {isCompleted && (
            <Badge className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0 border-emerald-200">
              Completed
            </Badge>
          )}
          {isInProgress && (
            <Badge className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0 border-blue-200 font-medium">
              Current Active
            </Badge>
          )}
          {isLocked && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground gap-1">
              <Lock className="w-2.5 h-2.5" /> Locked
            </Badge>
          )}
        </div>

        <h4 className="font-semibold text-sm text-foreground mt-0.5 truncate">{title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{subtitle}</p>

        {isLocked && lockReason && (
          <div className="mt-2 text-[11px] text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded border border-amber-200 dark:border-amber-900/50 flex items-center gap-1.5">
            <Lock className="w-3 h-3 shrink-0" />
            <span>{lockReason}</span>
          </div>
        )}
      </div>

      {!isLocked && (
        <ChevronRight className="w-4 h-4 text-muted-foreground self-center shrink-0" />
      )}
    </div>
  );
}

interface SequentialSkillTreeProps {
  skillTitle: string;
  summary: SkillProgressSummary;
  onSelectAction?: (actionType: 'lesson' | 'test' | 'assignment' | 'project') => void;
}

export function SequentialSkillTree({
  skillTitle,
  summary,
  onSelectAction,
}: SequentialSkillTreeProps) {
  const lessonsStatus =
    summary.lessonsCompleted >= summary.lessonsTotal && summary.lessonsTotal > 0
      ? 'completed'
      : summary.isUnlocked
      ? 'in_progress'
      : 'locked';

  const testStatus = !summary.practiceTestRequired
    ? 'completed'
    : summary.practiceTestPassed
    ? 'completed'
    : lessonsStatus === 'completed'
    ? 'in_progress'
    : 'locked';

  const assignStatus = !summary.assignmentRequired
    ? 'completed'
    : summary.assignmentApproved
    ? 'completed'
    : testStatus === 'completed'
    ? 'in_progress'
    : 'locked';

  const projStatus = !summary.projectRequired
    ? 'completed'
    : summary.projectApproved
    ? 'completed'
    : assignStatus === 'completed'
    ? 'in_progress'
    : 'locked';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1 border-b border-border">
        <div>
          <h3 className="text-sm font-bold text-foreground">{skillTitle}</h3>
          <p className="text-xs text-muted-foreground">Sequential Progression Track</p>
        </div>
        {summary.isCompleted ? (
          <Badge className="bg-emerald-600 text-white gap-1 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5" /> Skill Mastered
          </Badge>
        ) : (
          <Badge variant="outline" className="text-xs text-blue-600 border-blue-300">
            {summary.isUnlocked ? 'In Progress' : 'Locked'}
          </Badge>
        )}
      </div>

      <div className="grid gap-2.5">
        <SequentialStep
          number={1}
          title="Interactive Video & Text Lessons"
          subtitle={`${summary.lessonsCompleted} of ${summary.lessonsTotal} lessons completed`}
          status={lessonsStatus}
          icon={PlayCircle}
          onClick={() => onSelectAction && onSelectAction('lesson')}
        />

        <SequentialStep
          number={2}
          title="Skill Practice Test"
          subtitle={
            summary.practiceTestPassed
              ? `Passed with ${summary.practiceTestScore || 80}% score`
              : 'Pass with at least 70% to unlock practical tasks'
          }
          status={testStatus}
          icon={HelpCircle}
          lockReason="Complete all preceding lessons to unlock practice test"
          onClick={() => onSelectAction && onSelectAction('test')}
        />

        <SequentialStep
          number={3}
          title="Practical Skill Assignment"
          subtitle={
            summary.assignmentApproved
              ? 'Approved by Faculty Reviewer'
              : 'Submit repository & working code for rubric grading'
          }
          status={assignStatus}
          icon={FileCheck2}
          lockReason="Pass the practice test first"
          onClick={() => onSelectAction && onSelectAction('assignment')}
        />

        <SequentialStep
          number={4}
          title="Case Study Project"
          subtitle={
            summary.projectApproved
              ? 'Approved for verified student portfolio'
              : 'Real-world problem statement with deliverables'
          }
          status={projStatus}
          icon={FolderGit2}
          lockReason="Pass skill assignment first"
          onClick={() => onSelectAction && onSelectAction('project')}
        />
      </div>
    </div>
  );
}
