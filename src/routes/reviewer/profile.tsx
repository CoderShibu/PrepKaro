import { createFileRoute } from '@tanstack/react-router';
import { User, ClipboardCheck, Shield } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const Route = createFileRoute('/reviewer/profile')({
  component: ReviewerProfilePage,
});

function ReviewerProfilePage() {
  const { currentUser } = usePrepKaroStore();

  return (
    <AppShell>
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="pb-2 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">Reviewer Profile</h1>
          <p className="text-xs text-muted-foreground">Faculty and evaluator credentials.</p>
        </div>

        <Card className="border-border shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
              alt={currentUser.fullName}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-teal-500/20"
            />
            <div>
              <h3 className="font-bold text-base text-foreground">{currentUser.fullName}</h3>
              <p className="text-xs text-muted-foreground">{currentUser.email}</p>
              <Badge className="bg-teal-600 text-white text-[10px] mt-1">Faculty Reviewer</Badge>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-border text-xs">
            <div>
              <span className="font-semibold text-foreground block">Professional Bio:</span>
              <p className="text-muted-foreground">{currentUser.bio}</p>
            </div>
            <div>
              <span className="font-semibold text-foreground block">Specialization:</span>
              <p className="text-muted-foreground">{currentUser.skillsInterests.join(', ')}</p>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
