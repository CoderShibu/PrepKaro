import { Link } from '@tanstack/react-router';
import { FileText, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

export function TermsOfServicePage() {
  const lastUpdated = 'October 28, 2026';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
        <div className="max-w-5xl mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
              Prep<span className="text-blue-600">Karo</span>
            </span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-xs gap-1.5 h-8">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Platform</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-[#0B1F44] text-white py-12 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Terms and Conditions</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Last Updated: {lastUpdated} | PrepKaro Education Technologies
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-8">
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <CardContent className="p-6 sm:p-10 space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                1. Agreement to Terms
              </h2>
              <p>
                These Terms and Conditions constitute a legally binding agreement between you and PrepKaro Education Technologies ("PrepKaro", "we", "us", or "our"). By registering, accessing coursework, taking assessments, or utilizing career services, you agree to comply with and be bound by these terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                2. Sequential Learning and Prerequisite Policy
              </h2>
              <p>
                PrepKaro enforces deterministic, sequential progression. To ensure authentic mastery:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>Skills must be completed in the designated curriculum order. Prerequisite skills must be 100% completed before subsequent units unlock.</li>
                <li>Skipping coursework, practice tests, or required assignments is prohibited.</li>
                <li>Attempts to bypass sequential unlocking through client-side manipulation will result in immediate account suspension and credential revocation.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                3. Academic Integrity and Anti-Plagiarism Standards
              </h2>
              <p>
                All submitted source code repositories, assignments, and case studies must represent the student's original engineering work:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>Submissions are screened with automated similarity analysis and reviewed by faculty evaluators.</li>
                <li>Submissions exceeding acceptable similarity thresholds or utilizing uncredited code will be marked as rejected or flagged for revision.</li>
                <li>Multiple academic integrity violations will disqualify the student from certificate issuance and career placement assistance.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                4. 14-Day Refund Guarantee Policy
              </h2>
              <p>
                PrepKaro offers a transparent, conditional 14-day refund policy for paid enrollments:
              </p>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                <div className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                  Mandatory Refund Eligibility Criteria
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <li>Request submitted within 14 calendar days of initial course enrollment.</li>
                  <li>Less than 50% of the total course lessons and curriculum units have been accessed.</li>
                  <li>No official Certificate of Completion has been generated, claimed, or issued.</li>
                </ul>
              </div>
              <p className="text-xs text-slate-500">
                Refunds are processed to the original payment source within 5-7 business days following administrative verification.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                5. Certificates and Public Verification
              </h2>
              <p>
                Official PrepKaro Certificates are awarded exclusively upon 100% completion of all curriculum units, passing scores on all technical practice tests, and approval of all assignments and case study projects by authorized reviewers. Each certificate contains a unique alphanumeric identifier verifiable via our public verification registry.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                6. Career Support and Job Listings Disclaimer
              </h2>
              <p>
                PrepKaro facilitates direct connection between verified students and vetted hiring partners. While we provide technical interview preparation, verified skill credentials, and application forwarding, PrepKaro does not guarantee employment or specific salary outcomes. Hiring decisions rest solely with prospective employers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                7. Limitation of Liability and Governing Law
              </h2>
              <p>
                These terms are governed by the laws of India. Any disputes arising in connection with the Platform shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka. PrepKaro shall not be liable for indirect, incidental, or consequential damages arising from service interruption.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                8. Contact Information
              </h2>
              <p className="text-xs sm:text-sm">
                For questions regarding these Terms and Conditions, please contact:
              </p>
              <p className="text-xs font-mono bg-slate-100 dark:bg-slate-800 p-2.5 rounded-md inline-block">
                support@prepkaro.com | PrepKaro Legal, Bengaluru, Karnataka, India
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
