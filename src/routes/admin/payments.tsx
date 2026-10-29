import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  AlertCircle,
  DollarSign,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/payments')({
  component: AdminPaymentsPage,
});

function AdminPaymentsPage() {
  const { refundRequests, resolveRefundRequest } = usePrepKaroStore();

  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [decisionNotes, setDecisionNotes] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [targetDecision, setTargetDecision] = useState<'approved' | 'rejected'>('approved');

  const handleOpenAction = (request: any, decision: 'approved' | 'rejected') => {
    setSelectedRequest(request);
    setTargetDecision(decision);
    setDecisionNotes(decision === 'approved' ? 'Meets 14-day policy window criteria.' : 'Exceeded course completion threshold.');
    setDialogOpen(true);
  };

  const handleConfirmDecision = () => {
    if (!selectedRequest) return;
    resolveRefundRequest(selectedRequest.id, targetDecision, decisionNotes);
    setDialogOpen(false);
    toast.success(`Refund request ${targetDecision.toUpperCase()}! Transaction reconciled.`);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
                Financial Operations
              </Badge>
              <span className="text-xs text-muted-foreground">• Razorpay Integration & Refunds</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Payments & Refunds Management
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Review transaction histories, verify refund policy compliance, and disburse approved refunds.
            </p>
          </div>
        </div>

        {/* Policy Notice Card */}
        <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 text-xs text-muted-foreground space-y-1">
          <span className="font-bold text-foreground block">PrepKaro 14-Day Refund Policy Checklist:</span>
          <p>
            1. Enrolled &lt; 14 days ago. • 2. Completed &lt; 50% course content. • 3. Zero official completion certificates claimed.
          </p>
        </div>

        {/* Refund Requests Queue */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-foreground">Refund Requests Queue ({refundRequests.length})</h2>
          <div className="grid gap-3">
            {refundRequests.map(ref => (
              <Card key={ref.id} className="border-border shadow-sm p-5 bg-card text-xs">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`text-[10px] ${
                          ref.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ref.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ref.status.toUpperCase()}
                      </Badge>
                      <span className="font-bold text-foreground text-sm">{ref.courseTitle}</span>
                      <span className="text-muted-foreground">({ref.userName} • {ref.userEmail})</span>
                    </div>

                    <p className="text-foreground">
                      <strong>Reason:</strong> {ref.reason}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                      <span>Transaction Ref: <strong className="text-foreground">{ref.transactionRef}</strong></span>
                      <span>Amount: <strong className="text-foreground font-mono">₹{ref.amount} {ref.currency}</strong></span>
                      <span>Submitted: {new Date(ref.createdAt).toLocaleDateString()}</span>
                    </div>

                    {ref.eligibilityDetails && (
                      <p className="text-[11px] text-teal-700 dark:text-teal-400 font-semibold bg-muted/40 p-2 rounded">
                        Policy Check: {ref.eligibilityDetails}
                      </p>
                    )}

                    {ref.adminNotes && (
                      <p className="text-[11px] text-primary italic bg-muted p-2 rounded">
                        Admin Decision Notes: {ref.adminNotes}
                      </p>
                    )}
                  </div>

                  {ref.status === 'pending' && (
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenAction(ref, 'rejected')}
                        className="text-xs h-8 text-rose-600 border-rose-300"
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleOpenAction(ref, 'approved')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 px-4"
                      >
                        Approve Refund
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Decision Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md text-xs">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">
                {targetDecision === 'approved' ? 'Approve Course Refund' : 'Reject Refund Request'}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Request for {selectedRequest?.userName} (₹{selectedRequest?.amount})
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Decision Notes & Reconciliation Reason</label>
                <Textarea
                  value={decisionNotes}
                  onChange={e => setDecisionNotes(e.target.value)}
                  rows={3}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)} className="text-xs h-8">
                Cancel
              </Button>
              <Button size="sm" onClick={handleConfirmDecision} className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                Confirm & Reconcile
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
