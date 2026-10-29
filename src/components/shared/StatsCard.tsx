import { type ReactNode } from 'react';
import { Card, CardContent } from '../ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: any;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  accentColor?: 'blue' | 'teal' | 'slate' | 'amber' | 'emerald';
}

export function StatsCard({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  accentColor = 'blue',
}: StatsCardProps) {
  const colorMap = {
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    teal: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    slate: 'bg-slate-500/10 text-slate-700 dark:text-slate-300',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  };

  return (
    <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-foreground tracking-tight">{value}</h3>
            {trend && (
              <span
                className={`text-xs font-semibold ${
                  trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {trend.isPositive ? '+' : ''}{trend.value}
              </span>
            )}
          </div>
          {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
        </div>

        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorMap[accentColor]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </CardContent>
    </Card>
  );
}
