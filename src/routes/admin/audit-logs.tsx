import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ShieldAlert, Search, Clock, Shield, Filter } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';

export const Route = createFileRoute('/admin/audit-logs')({
  component: AdminAuditLogsPage,
});

function AdminAuditLogsPage() {
  const { auditLogs } = usePrepKaroStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(
    l =>
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
              Security & Compliance
            </Badge>
            <span className="text-xs text-muted-foreground">• SOC-2 Style Audit Trail</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Security & Audit Logs ({auditLogs.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Immutable log of role escalations, course publishing, grading actions, and financial transactions.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 shadow-sm">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
            <Input
              placeholder="Search audit actions, user emails, or details..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </div>

        <Card className="border-border shadow-sm overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5 pl-5">Timestamp</th>
                  <th className="p-3.5">Action</th>
                  <th className="p-3.5">User & Role</th>
                  <th className="p-3.5">Target</th>
                  <th className="p-3.5 pr-5">Event Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-muted/40 transition-colors">
                    <td className="p-3.5 pl-5 text-muted-foreground font-sans">
                      {new Date(log.timestamp).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>

                    <td className="p-3.5">
                      <Badge variant="outline" className="text-[10px] font-bold">
                        {log.action}
                      </Badge>
                    </td>

                    <td className="p-3.5 font-sans">
                      <span className="font-semibold text-foreground block">{log.userEmail}</span>
                      <span className="text-[10px] text-muted-foreground capitalize">{log.role}</span>
                    </td>

                    <td className="p-3.5 font-sans text-muted-foreground">
                      {log.targetType}
                    </td>

                    <td className="p-3.5 pr-5 font-sans text-foreground">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
