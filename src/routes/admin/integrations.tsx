import { createFileRoute } from '@tanstack/react-router';
import {
  Sliders,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Mail,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';

export const Route = createFileRoute('/admin/integrations')({
  component: AdminIntegrationsPage,
});

function AdminIntegrationsPage() {
  const { integrations } = usePrepKaroStore();

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
              External Systems
            </Badge>
            <span className="text-xs text-muted-foreground">• Production Integration Layer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Integrations & Service Adapters ({integrations.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Health status, secure credentials management, and adapter boundaries for external SaaS providers.
          </p>
        </div>

        <div className="grid gap-4">
          {integrations.map(int => (
            <Card key={int.id} className="border-border shadow-sm bg-card p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 text-xs">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-[10px] ${
                        int.status === 'connected'
                          ? 'bg-emerald-100 text-emerald-800'
                          : int.status === 'sandbox'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {int.status.toUpperCase()}
                    </Badge>
                    <h3 className="font-bold text-sm text-foreground">{int.name}</h3>
                  </div>

                  <p className="text-foreground font-semibold">Provider: {int.provider}</p>
                  <p className="text-muted-foreground leading-relaxed">{int.description}</p>

                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground pt-1">
                    <span>Last Health Check: {new Date(int.lastChecked).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-medium">SSL Encrypted Boundary</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                  {int.docsUrl && (
                    <a href={int.docsUrl} target="_blank" rel="noreferrer">
                      <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5">
                        <ExternalLink className="w-3 h-3" />
                        <span>Docs</span>
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
