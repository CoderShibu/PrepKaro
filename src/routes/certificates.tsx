import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Printer,
  Share2,
  Download,
  Calendar,
  Lock,
  Sparkles,
} from 'lucide-react';
import { usePrepKaroStore } from '../lib/store';
import { Certificate } from '../lib/types';
import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { toast } from 'sonner';

export const Route = createFileRoute('/certificates')({
  component: CertificatesPage,
});

function CertificatesPage() {
  const { certificates, currentUser, courses, skills, completedLessonIds } = usePrepKaroStore();

  const userCerts = certificates.filter(c => c.userId === currentUser.id);

  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenCertificate = (cert: Certificate) => {
    setSelectedCert(cert);
    setModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = (code: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/verify/${code}`);
    toast.success('Public verification link copied to clipboard!');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 font-semibold">
                Tamper-Proof Credentials
              </Badge>
              <span className="text-xs text-muted-foreground">• Industry Recognized</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Achievements & Certificates
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Verified certificates awarded upon completing 100% of curriculum milestones, quizzes, and project reviews.
            </p>
          </div>
        </div>

        {/* Milestone Badges Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl border border-border bg-card flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-foreground block">First Lesson</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Achieved</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-border bg-card flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-foreground block">Quiz Master</span>
              <span className="text-[10px] text-emerald-600 font-semibold">95% Score</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-border bg-card flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-foreground block">Capstone Approved</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Verified</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-border bg-card flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-foreground block">Career Ready</span>
              <span className="text-[10px] text-teal-600 font-semibold">{userCerts.length} Issued</span>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid gap-6">
          {userCerts.map(cert => (
            <Card key={cert.id} className="border-border shadow-sm overflow-hidden bg-card">
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-900 flex items-center justify-center shrink-0 shadow-md">
                    <Award className="w-7 h-7 text-[#0B1F44]" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Verified Valid
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">{cert.code}</span>
                    </div>

                    <h3 className="font-bold text-lg text-foreground">{cert.courseTitle}</h3>
                    <p className="text-xs text-muted-foreground">
                      Awarded to <strong>{cert.recipientName}</strong> on {new Date(cert.issuedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyLink(cert.code)}
                    className="text-xs h-8 gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </Button>

                  <Link to={`/verify/${cert.code}`}>
                    <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5 border-blue-300 text-blue-700 dark:text-blue-300">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify</span>
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    onClick={() => handleOpenCertificate(cert)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-8 px-4"
                  >
                    View Credential
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Certificate View Modal */}
        {selectedCert && (
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="max-w-2xl p-0 overflow-hidden bg-card border-border">
              <div className="p-8 sm:p-12 text-center bg-gradient-to-b from-white to-blue-50/50 dark:from-slate-900 dark:to-slate-950 border-8 border-double border-amber-300/40 relative">
                {/* Security Stamp / Watermark */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 mx-auto flex items-center justify-center shadow-lg mb-4">
                  <Award className="w-8 h-8 text-[#0B1F44]" />
                </div>

                <span className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground block">
                  PrepKaro Academy of Advanced Engineering
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-2">
                  Certificate of Achievement
                </h2>

                <p className="text-xs text-muted-foreground mt-1">This is to officially certify that</p>

                <h3 className="text-xl sm:text-2xl font-black text-primary mt-3 font-serif">
                  {selectedCert.recipientName}
                </h3>

                <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto">
                  has rigorously completed all sequential learning milestones, practice assessments, and faculty-approved case study projects for
                </p>

                <h4 className="text-base sm:text-lg font-bold text-foreground mt-2">
                  {selectedCert.courseTitle}
                </h4>

                <div className="mt-8 pt-6 border-t border-border flex items-end justify-between text-xs text-muted-foreground">
                  <div className="text-left space-y-0.5">
                    <span className="font-mono text-foreground font-bold text-xs">{selectedCert.code}</span>
                    <span className="block text-[10px]">Tamper-Proof ID</span>
                  </div>

                  <div className="text-center space-y-0.5">
                    <span className="text-foreground font-semibold block">{new Date(selectedCert.issuedAt).toLocaleDateString()}</span>
                    <span className="block text-[10px]">Date of Issuance</span>
                  </div>

                  <div className="text-right space-y-0.5">
                    <span className="font-serif italic text-foreground font-bold text-sm block">Aman Singhania</span>
                    <span className="block text-[10px]">Academic Council Chair</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/40 border-t border-border flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => setModalOpen(false)} className="text-xs h-8">
                  Close
                </Button>
                <Button size="sm" onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 gap-1.5">
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AppShell>
  );
}
