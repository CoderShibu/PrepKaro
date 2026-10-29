import { type ReactNode } from 'react';
import { Button } from '../ui/button';

interface EmptyStateProps {
  icon?: any;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  children?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-card rounded-xl border border-dashed border-border my-4">
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mb-3">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1 max-w-sm">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} size="sm" className="mt-4">
          {actionText}
        </Button>
      )}
      {children}
    </div>
  );
}
