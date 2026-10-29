import { createFileRoute } from '@tanstack/react-router';
import { CheckSquare, Layers, Award } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';

export const Route = createFileRoute('/reviewer/rubrics')({
  component: ReviewerRubricsPage,
});

function ReviewerRubricsPage() {
  const { rubrics } = usePrepKaroStore();

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-teal-100 text-teal-800 text-[10px] px-2 py-0.5 font-semibold">
              Evaluation Standards
            </Badge>
            <span className="text-xs text-muted-foreground">• Standardized Criteria</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Assessment Rubrics
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Standard rubrics for grading practical student submissions consistently across cohorts.
          </p>
        </div>

        <div className="space-y-6">
          {rubrics.map(rubric => (
            <Card key={rubric.id} className="border-border shadow-sm bg-card">
              <CardHeader className="pb-3 border-b border-border/60">
                <CardTitle className="text-base font-bold">{rubric.title}</CardTitle>
                <CardDescription className="text-xs">
                  {rubric.criteria.length} standardized grading dimensions
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4 divide-y divide-border/60">
                {rubric.criteria.map(crit => (
                  <div key={crit.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-foreground">{crit.name}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{crit.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <Badge variant="outline" className="text-xs font-mono font-bold">
                        {crit.maxPoints} Points
                      </Badge>
                      <span className="text-[10px] text-muted-foreground block mt-0.5">Weight: {crit.weight}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
