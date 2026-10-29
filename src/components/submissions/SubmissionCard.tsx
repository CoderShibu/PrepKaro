import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { FileCheck, Github, Globe, ExternalLink } from 'lucide-react';
import type { Submission } from '../../types';

export function SubmissionCard({ submission }: { submission: Submission }) {
  const statusColors: Record<string, string> = {
    approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    under_review: 'bg-blue-100 text-blue-800 border-blue-200',
    revision_requested: 'bg-amber-100 text-amber-800 border-amber-200',
    submitted: 'bg-slate-100 text-slate-800 border-slate-200',
    draft: 'bg-slate-100 text-slate-800 border-slate-200',
    rejected: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`text-xs ${statusColors[submission.status] || ''}`}>
            {submission.status.replace('_', ' ').toUpperCase()}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Attempt #{submission.attempt}
          </span>
        </div>

        <h4 className="font-semibold text-sm text-foreground">
          {submission.targetTitle || 'Submission'}
        </h4>

        {submission.textResponse && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {submission.textResponse}
          </p>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          {submission.repoUrl && (
            <a
              href={submission.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
            >
              <Github className="w-3.5 h-3.5" /> Code
            </a>
          )}
          {submission.demoUrl && (
            <a
              href={submission.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline ml-2"
            >
              <Globe className="w-3.5 h-3.5" /> Demo
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
