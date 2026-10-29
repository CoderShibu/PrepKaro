export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3 w-full animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-16 bg-muted/60 rounded-xl w-full" />
      ))}
    </div>
  );
}
