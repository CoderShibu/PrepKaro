import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface AssessmentTimerProps {
  initialMinutes: number;
  onExpire?: () => void;
}

export function AssessmentTimer({ initialMinutes, onExpire }: AssessmentTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onExpire]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const isUrgent = secondsLeft < 300; // less than 5 min

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold ${
        isUrgent
          ? 'bg-rose-50 text-rose-600 border border-rose-200 animate-pulse'
          : 'bg-muted text-foreground border border-border'
      }`}
    >
      <Clock className="w-3.5 h-3.5" />
      <span>
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </span>
    </div>
  );
}
