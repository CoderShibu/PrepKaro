import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Bell,
  CheckCircle2,
  Clock,
  ExternalLink,
  Award,
  FileCheck2,
  Briefcase,
  BookOpen,
} from 'lucide-react';
import { usePrepKaroStore } from '../lib/store';
import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

export const Route = createFileRoute('/notifications')({
  component: NotificationsPage,
});

function NotificationsPage() {
  const { notifications, markNotificationsAsRead, currentUser } = usePrepKaroStore();

  const userNotifs = notifications.filter(n => n.userId === currentUser.id || !n.userId);

  return (
    <AppShell>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 font-semibold">
                Activity Feed
              </Badge>
              <span className="text-xs text-muted-foreground">• In-App Notifications</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Notifications
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Stay updated on review grades, sequential unlocks, upcoming milestones, and matching jobs.
            </p>
          </div>

          <Button
            onClick={markNotificationsAsRead}
            variant="outline"
            size="sm"
            className="text-xs h-8"
          >
            Mark All as Read
          </Button>
        </div>

        <div className="space-y-3">
          {userNotifs.map(notif => (
            <Card
              key={notif.id}
              className={`border-border shadow-sm transition-colors ${
                !notif.readAt ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900' : 'bg-card'
              }`}
            >
              <CardContent className="p-4 sm:p-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      notif.type === 'certificate'
                        ? 'bg-amber-500/10 text-amber-600'
                        : notif.type === 'review'
                        ? 'bg-blue-500/10 text-blue-700'
                        : notif.type === 'job'
                        ? 'bg-teal-500/10 text-teal-600'
                        : 'bg-blue-500/10 text-blue-600'
                    }`}
                  >
                    {notif.type === 'certificate' ? (
                      <Award className="w-5 h-5" />
                    ) : notif.type === 'review' ? (
                      <FileCheck2 className="w-5 h-5" />
                    ) : notif.type === 'job' ? (
                      <Briefcase className="w-5 h-5" />
                    ) : (
                      <Bell className="w-5 h-5" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-foreground">{notif.title}</h4>
                      {!notif.readAt && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{notif.body}</p>
                    {notif.link && (
                      <Link
                        to={notif.link}
                        className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline pt-1"
                      >
                        <span>View Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>

                <span className="text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3" />
                  {new Date(notif.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </CardContent>
            </Card>
          ))}

          {userNotifs.length === 0 && (
            <div className="p-12 text-center border border-dashed border-border rounded-xl bg-card space-y-2">
              <Bell className="w-8 h-8 text-muted-foreground mx-auto opacity-50" />
              <p className="text-xs text-muted-foreground">You're all caught up! No notifications.</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
