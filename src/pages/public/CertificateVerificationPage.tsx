import { Link, useParams } from '@tanstack/react-router';
import {
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

export function CertificateVerificationPage() {
  const { code } = useParams({ from: '/verify/$code' });
  const { certificates } = usePrepKaroStore();

  const cert = certificates.find(c => c.code.toUpperCase() === code.toUpperCase());

  return (
    <AppShell hideSidebar>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 py-16 bg-muted/30">
        <div className="w-full max-w-xl space-y-6">
          {/* Brand Logo Header */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-[#0B1F44] flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-xl">P</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-foreground">
                Prep<span className="text-blue-600">Karo</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
              Official Credential Verification Registry
            </p>
          </div>

          {cert ? (
            <Card className="border-border shadow-xl overflow-hidden bg-card">
              {/* Verified Header Strip */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur mx-auto flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <Badge className="bg-white text-emerald-800 text-xs font-bold px-3 py-0.5">
                  Authenticity Verified
                </Badge>
                <h2 className="text-xl font-bold tracking-tight">
                  Official Academic Credential
                </h2>
                <p className="text-xs text-emerald-100 font-mono">ID: {cert.code}</p>
              </div>

              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="space-y-4 text-xs divide-y divide-border">
                  <div className="pb-3 flex justify-between items-center">
                    <span className="text-muted-foreground">Certified Scholar</span>
                    <span className="font-bold text-foreground text-sm">{cert.recipientName}</span>
                  </div>

                  <div className="pt-3 pb-3 flex justify-between items-center">
                    <span className="text-muted-foreground">Course Track</span>
                    <span className="font-bold text-foreground text-right max-w-xs">{cert.courseTitle}</span>
                  </div>

                  <div className="pt-3 pb-3 flex justify-between items-center">
                    <span className="text-muted-foreground">Date of Issuance</span>
                    <span className="font-semibold text-foreground">
                      {new Date(cert.issuedAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="pt-3 pb-3 flex justify-between items-center">
                    <span className="text-muted-foreground">Verification Status</span>
                    <Badge className="bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                      Active & Valid
                    </Badge>
                  </div>

                  <div className="pt-3 flex justify-between items-center">
                    <span className="text-muted-foreground">Academic Authority</span>
                    <span className="font-semibold text-foreground">{cert.instructorName}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-muted-foreground space-y-1">
                  <span className="font-bold text-foreground block">Verification Statement:</span>
                  <p>
                    PrepKaro certifies that the recipient completed 100% of curriculum milestones, server-verified practice tests, and faculty-approved case study projects under strict academic integrity policies.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link to="/" className="text-xs text-primary hover:underline font-medium">
                    ← Return to PrepKaro Home
                  </Link>

                  <Link to="/courses">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-8 gap-1">
                      <span>Explore Tracks</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border shadow-xl p-8 text-center space-y-4">
              <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
              <h2 className="text-lg font-bold text-foreground">Credential Not Found</h2>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No certificate was found with credential identifier <strong className="font-mono text-foreground">{code}</strong>.
              </p>
              <Link to="/">
                <Button size="sm" variant="outline" className="text-xs h-8">
                  Go to Homepage
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
}
