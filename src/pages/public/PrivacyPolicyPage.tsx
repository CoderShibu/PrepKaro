import { Link } from '@tanstack/react-router';
import { Shield, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

export function PrivacyPolicyPage() {
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
            <Shield className="w-3.5 h-3.5" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Effective Date: {lastUpdated} | PrepKaro Education Technologies
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-8">
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <CardContent className="p-6 sm:p-10 space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                1. Introduction and Scope
              </h2>
              <p>
                PrepKaro ("we", "our", or "the Platform") is committed to protecting your personal data and upholding your right to privacy. This Privacy Policy governs your use of the PrepKaro learning management system, assessment engine, code review workspace, and career placement services.
              </p>
              <p>
                By creating an account, enrolling in coursework, taking assessments, or submitting code assignments, you acknowledge the data collection and processing practices described herein.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                2. Information We Collect
              </h2>
              <p>We collect and process the following categories of information:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>
                  <strong className="text-slate-900 dark:text-white">Account Identification:</strong> Full name, verified email address, phone number, and encrypted authentication tokens.
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white">Academic & Learning Records:</strong> Lesson completion milestones, practice test timestamps, attempt counts, server-verified assessment scores, and sequential skill progression state.
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white">Practical Submissions:</strong> GitHub repository URLs, live demo URLs, uploaded archive files, text responses, and reviewer evaluation scores.
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white">Career Profile:</strong> Resumes, linked portfolio projects, professional summaries, and job application histories.
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white">Financial Transactions:</strong> Order IDs, payment transaction references, and refund eligibility audit logs. We do not store raw payment card numbers or banking credentials.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                3. How We Use Your Information
              </h2>
              <p>We process your information strictly for legitimate educational and operational purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>Enforcing prerequisite unlocking rules and calculating course completion eligibility.</li>
                <li>Assigning student submissions to verified faculty reviewers for rubric-based grading.</li>
                <li>Issuing tamper-proof completion certificates verifiable via unique alphanumeric credential codes.</li>
                <li>Evaluating compliance with our 14-day refund guarantee policy.</li>
                <li>Matching qualified students to vetted partner job openings based on verified skills.</li>
                <li>Detecting and mitigating plagiarism or academic dishonesty.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                4. Data Protection and Security Controls
              </h2>
              <p>
                PrepKaro implements industry-standard technical and operational safeguards:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <div className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    Row-Level Security (RLS)
                  </div>
                  <p className="text-xs text-slate-500">
                    Database isolation guarantees students and reviewers only access authorized data.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <div className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Audit Trail Logging
                  </div>
                  <p className="text-xs text-slate-500">
                    Immutable security logs for all role escalations, course publishing, and grading decisions.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                5. Third-Party Disclosures
              </h2>
              <p>
                We do not sell, rent, or trade your personal data. We disclose information solely to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>Authorized payment gateways (e.g., Razorpay) to complete verified transactions and refunds.</li>
                <li>Prospective hiring partners, strictly with your explicit consent when submitting a job application.</li>
                <li>Law enforcement or regulatory bodies when required by applicable law.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                6. Your Rights and Data Retention
              </h2>
              <p>
                You have the right to inspect, correct, export, or request deletion of your personal account data at any time via your Profile Settings. Data associated with public certificate verification records is retained to maintain verified credential integrity.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                7. Contact Our Privacy Officer
              </h2>
              <p className="text-xs sm:text-sm">
                For questions regarding this policy or data processing practices, contact our Data Protection Officer at:
              </p>
              <p className="text-xs font-mono bg-slate-100 dark:bg-slate-800 p-2.5 rounded-md inline-block">
                privacy@prepkaro.com | PrepKaro Operations, Bengaluru, Karnataka, India
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
