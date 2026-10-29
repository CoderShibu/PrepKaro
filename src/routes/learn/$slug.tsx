import { createFileRoute, useParams } from '@tanstack/react-router';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { InteractivePlayer } from '../../components/learning/InteractivePlayer';

export const Route = createFileRoute('/learn/$slug')({
  component: LearnPage,
});

function LearnPage() {
  const { slug } = useParams({ from: '/learn/$slug' });
  const { courses } = usePrepKaroStore();

  const course = courses.find(c => c.slug === slug) || courses[0];

  return (
    <AppShell>
      <div className="space-y-4">
        <InteractivePlayer course={course} />
      </div>
    </AppShell>
  );
}
