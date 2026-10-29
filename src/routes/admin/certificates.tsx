import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Award, Plus, Search, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/certificates')({
  component: AdminCertificatesPage,
});

function AdminCertificatesPage() {
  const { certificates, issueCertificate, courses, profiles } = usePrepKaroStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = certificates.filter(
    c =>
      c.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
                Academic Operations
              </Badge>
              <span className="text-xs text-muted-foreground">• Credential Issuance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Certificates Registry ({certificates.length})
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Manage issued credentials, verify eligibility, and inspect tamper-proof verification records.
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 shadow-sm">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
            <Input
              placeholder="Search by student name or certificate code..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filtered.map(cert => (
            <Card key={cert.id} className="border-border shadow-sm bg-card p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {cert.status.toUpperCase()}
                    </Badge>
                    <span className="font-mono font-bold text-foreground text-sm">{cert.code}</span>
                  </div>
                  <h3 className="font-bold text-sm text-foreground">{cert.courseTitle}</h3>
                  <p className="text-muted-foreground">
                    Awarded to <strong className="text-foreground">{cert.recipientName}</strong> on{' '}
                    {new Date(cert.issuedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link to={`/verify/${cert.code}`}>
                    <Button variant="outline" size="sm" className="text-xs h-8 gap-1 border-blue-300 text-blue-700 dark:text-blue-300">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Public Portal</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
