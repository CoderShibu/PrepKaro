import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Settings, Save, Shield, Sliders, Bell } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/settings')({
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState('PrepKaro');
  const [defaultPassScore, setDefaultPassScore] = useState(70);
  const [refundWindowDays, setRefundWindowDays] = useState(14);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoPlagiarismCheck, setAutoPlagiarismCheck] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Platform configuration settings saved successfully!');
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
              Global Preferences
            </Badge>
            <span className="text-xs text-muted-foreground">• System Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Platform Settings
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Configure global pass thresholds, refund evaluation rules, and system maintenance mode.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <Card className="border-border shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-sm text-foreground">Academic Progression Rules</h3>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Platform Brand Name</label>
                <Input value={platformName} onChange={e => setPlatformName(e.target.value)} className="text-xs h-9" />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Default Quiz Pass Threshold (%)</label>
                <Input
                  type="number"
                  value={defaultPassScore}
                  onChange={e => setDefaultPassScore(Number(e.target.value))}
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Refund Policy Window (Days)</label>
                <Input
                  type="number"
                  value={refundWindowDays}
                  onChange={e => setRefundWindowDays(Number(e.target.value))}
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Reviewer SLA Target (Hours)</label>
                <Input type="number" defaultValue={24} className="text-xs h-9" />
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-foreground block">Automated Code Plagiarism & Similarity Scans</span>
                  <span className="text-muted-foreground">Scan every student repository submission automatically.</span>
                </div>
                <Switch checked={autoPlagiarismCheck} onCheckedChange={setAutoPlagiarismCheck} />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <div>
                  <span className="font-semibold text-foreground block">Platform Maintenance Mode</span>
                  <span className="text-muted-foreground">Temporarily restrict public enrollments for scheduled maintenance.</span>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 gap-2">
              <Save className="w-4 h-4" />
              Save Platform Configuration
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
