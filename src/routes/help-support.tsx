import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  HelpCircle,
  FileText,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Send,
  Sparkles,
} from 'lucide-react';
import { usePrepKaroStore } from '../lib/store';
import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';

export const Route = createFileRoute('/help-support')({
  component: HelpSupportPage,
});

function HelpSupportPage() {
  const {
    courses,
    enrollments,
    currentUser,
    refundRequests,
    submitRefundRequest,
  } = usePrepKaroStore();

  const userRefunds = refundRequests.filter(r => r.userId === currentUser.id);

  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [reasonCategory, setReasonCategory] = useState<'content_dissatisfaction' | 'scheduling_conflict' | 'financial_need' | 'other'>('content_dissatisfaction');
  const [reasonNotes, setReasonNotes] = useState('');

  const faqs = [
    {
      q: 'How does the Sequential Learning Engine work?',
      a: 'Courses are structured into ordered skills. Skill 0 is unlocked upon enrollment. To unlock Skill 1, you must complete all preceding lessons, pass the practice test (minimum 70%), submit the assignment, and have your case study project approved by a reviewer.',
    },
    {
      q: 'How are practice test scores validated?',
      a: 'Assessment scoring is strictly enforced server-side. Attempts are recorded with question timestamps, randomized question orders, and attempt limits.',
    },
    {
      q: 'What is the PrepKaro Refund Policy?',
      a: 'We offer a 14-day transparent refund guarantee. You qualify for an automated refund review if you request within 14 days of enrollment, have completed less than 50% of the course content, and have not yet claimed an official certificate.',
    },
    {
      q: 'How do employers verify my certificate?',
      a: 'Every issued certificate carries a unique tamper-proof identifier (e.g. PK-2026-9F82A1). Employers can verify the credential in real time at our public portal (/verify/:code).',
    },
  ];

  const handleRefundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reasonNotes.trim()) {
      toast.error('Please describe your reason for requesting a refund.');
      return;
    }

    submitRefundRequest(selectedCourseId, reasonNotes, reasonCategory);
    setReasonNotes('');
    toast.success('Refund request submitted! Status: Under Policy Evaluation');
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 font-semibold">
              Support Center
            </Badge>
            <span className="text-xs text-muted-foreground">• Knowledge Base & Policy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Help & Support
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Find answers to common questions and submit policy refund requests.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-foreground">Frequently Asked Questions</h2>
          <div className="grid gap-3">
            {faqs.map((faq, i) => (
              <Card key={i} className="border-border shadow-sm bg-card">
                <CardContent className="p-4 space-y-1.5">
                  <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-6">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Refund Workflow Section */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div>
            <h2 className="text-base font-bold text-foreground">Transparent Refund Workflow</h2>
            <p className="text-xs text-muted-foreground">
              Submit a refund evaluation request. Complies with PrepKaro 14-day policy checklist.
            </p>
          </div>

          {/* Past Refund Requests */}
          {userRefunds.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                Your Submitted Refund Requests
              </span>
              {userRefunds.map(ref => (
                <div key={ref.id} className="p-4 rounded-xl border border-border bg-card space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">{ref.courseTitle}</span>
                    <Badge
                      className={`text-[10px] ${
                        ref.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ref.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      Status: {ref.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{ref.reason}</p>
                  <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Transaction Ref: {ref.transactionRef}</span>
                    <span>Amount: ₹{ref.amount}</span>
                  </div>
                  {ref.adminNotes && (
                    <p className="text-[11px] text-primary italic bg-muted p-2 rounded">
                      Admin Note: {ref.adminNotes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Refund Request Form */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-sm font-bold">Request a Course Refund</CardTitle>
              <CardDescription className="text-xs">
                Evaluated against the 14-day window and completion threshold.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-5">
              <form onSubmit={handleRefundSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Select Enrolled Course</label>
                  <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(c => (
                        <SelectItem key={c.id} value={c.id} className="text-xs">
                          {c.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Reason Category</label>
                  <Select value={reasonCategory} onValueChange={v => setReasonCategory(v as any)}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="content_dissatisfaction" className="text-xs">Curriculum / Content Dissatisfaction</SelectItem>
                      <SelectItem value="scheduling_conflict" className="text-xs">Scheduling / Exam Conflict</SelectItem>
                      <SelectItem value="financial_need" className="text-xs">Accidental Purchase / Financial Need</SelectItem>
                      <SelectItem value="other" className="text-xs">Other Reason</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Detailed Explanation</label>
                  <Textarea
                    value={reasonNotes}
                    onChange={e => setReasonNotes(e.target.value)}
                    rows={3}
                    placeholder="Provide specific context so our administrative team can verify eligibility..."
                    className="text-xs"
                    required
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-9 px-6 gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    Submit Refund Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
