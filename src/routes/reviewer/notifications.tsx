import { createFileRoute } from '@tanstack/react-router';
import { Bell, Clock, ClipboardCheck } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

export const Route = createFileRoute('/reviewer/notifications')({
  component: ReviewerNotificationsPage,
});

function ReviewerNotificationsPage() {
  const { notifications, markNotificationsAsRead, currentUser } = usePrepKaroStore();
  const revNotifs = notifications.filter(n => n.userId === currentUser.id || n.type === 'review');

  return (
    <AppShell>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reviewer Notifications</h1>
            <p className="text-xs text-muted-foreground">Workload assignments and evaluation alerts.</p>
          </div>
          <Button variant="outline" size="sm" onClick={markNotificationsAsRead} className="text-xs h-8">
            Mark Read
          </Button>
        </div>

        <div className="space-y-3">
          {revNotifs.map(n => (
            <Card key={n.id} className="border-border shadow-sm p-4 bg-card">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-bold text-xs text-foreground flex items-center gap-1.5">
                    <ClipboardCheck className="w-4 h-4 text-teal-600" />
                    <span>{n.title}</span>
                  </h4>
                  <p className="text-xs text-muted-foreground">{n.body}</p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">
                  {new Date(n.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
