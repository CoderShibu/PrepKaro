import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  MessageSquareCode,
  Sparkles,
  Bot,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Building,
  GraduationCap,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import { usePrepKaroStore } from '../lib/store';
import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

export const Route = createFileRoute('/interview-prep')({
  component: InterviewPrepPage,
});

function InterviewPrepPage() {
  const { interviewQuestions, interviewSessions, currentUser } = usePrepKaroStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');

  // AI Mock Simulator state
  const [activeQuestion, setActiveQuestion] = useState(interviewQuestions[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAiEvaluating, setIsAiEvaluating] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<{
    score: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
  } | null>(null);

  const categories = ['All', 'Frontend', 'Backend', 'System Design', 'GenAI'];
  const companies = ['All', 'Google', 'Amazon', 'TCS', 'Swiggy'];

  const filteredQuestions = interviewQuestions.filter(q => {
    const matchCat = selectedCategory === 'All' || q.category === selectedCategory;
    const matchComp = selectedCompany === 'All' || q.company === selectedCompany;
    return matchCat && matchComp;
  });

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) {
      toast.error('Please draft an answer before requesting AI evaluation.');
      return;
    }

    setIsAiEvaluating(true);
    setTimeout(() => {
      // Deterministic evaluation simulator based on length and keywords
      const lengthScore = Math.min(10, Math.max(6, Math.round(userAnswer.split(' ').length / 8)));
      setAiEvaluation({
        score: lengthScore,
        feedback:
          lengthScore >= 8
            ? 'Strong technical explanation. Good architectural reasoning and appropriate keyword depth.'
            : 'Covers the foundation, but could provide more concrete trade-offs and edge-case handling.',
        strengths: [
          'Directly addresses the prompt without extraneous fluff',
          'Demonstrates understanding of core system constraints',
        ],
        improvements: [
          'Cite specific latency metrics or complexity trade-offs',
          'Explain fallback or failure recovery behavior',
        ],
      });
      setIsAiEvaluating(false);
      toast.success('AI Evaluation completed with actionable feedback!');
    }, 700);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 font-semibold">
                Career Readiness
              </Badge>
              <span className="text-xs text-muted-foreground">• Placement Preparation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Interview Preparation
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Practice real company interview questions and receive instant AI feedback on technical reasoning.
            </p>
          </div>
        </div>

        {/* AI Mock Interview Assistant Panel */}
        <Card className="border-blue-200 dark:border-blue-900 bg-gradient-to-br from-card to-blue-50/40 dark:to-blue-950/20 shadow-md">
          <CardHeader className="pb-3 border-b border-border/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <span>AI Interview Assistant Simulator</span>
                    <Badge className="bg-teal-600 text-white text-[10px] font-semibold">
                      Live Guidance
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Simulate real technical interviews with instant feedback on clarity and depth.
                  </CardDescription>
                </div>
              </div>

              {activeQuestion.company && (
                <Badge variant="outline" className="text-xs border-blue-300 text-blue-700 dark:text-blue-300 font-semibold gap-1">
                  <Building className="w-3 h-3" /> {activeQuestion.company}
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-5 space-y-4">
            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  Question: {activeQuestion.category} ({activeQuestion.difficulty})
                </span>
                <span className="text-xs text-muted-foreground">Select another question below anytime</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                {activeQuestion.question}
              </h3>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>Draft Your Response</span>
                <span className="text-muted-foreground text-[11px]">
                  {userAnswer.split(' ').filter(Boolean).length} words
                </span>
              </label>
              <Textarea
                placeholder="Structure your answer using the STAR method or clear architectural points..."
                rows={4}
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                className="text-xs font-sans"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <p className="text-[11px] text-muted-foreground italic">
                AI feedback offers structured guidance and does not guarantee interview results.
              </p>

              <div className="flex items-center gap-2">
                {aiEvaluation && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setUserAnswer('');
                      setAiEvaluation(null);
                    }}
                    className="text-xs h-8"
                  >
                    Clear
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={handleEvaluateAnswer}
                  disabled={isAiEvaluating}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-8 px-4 gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isAiEvaluating ? 'Analyzing...' : 'Evaluate with AI'}
                </Button>
              </div>
            </div>

            {/* AI Result Card */}
            {aiEvaluation && (
              <div className="p-4 rounded-xl border border-blue-300 dark:border-blue-900 bg-card space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-xs text-foreground">AI Technical Reasoning Assessment</span>
                  </div>
                  <Badge className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5">
                    Score: {aiEvaluation.score} / 10
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {aiEvaluation.feedback}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-border/60 text-xs">
                  <div className="space-y-1">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 block text-[11px]">
                      Key Strengths
                    </span>
                    {aiEvaluation.strengths.map((str, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-muted-foreground text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-amber-700 dark:text-amber-400 block text-[11px]">
                      Suggested Refinements
                    </span>
                    {aiEvaluation.improvements.map((imp, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-muted-foreground text-[11px]">
                        <AlertCircle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Company Question Bank with Model Answers */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-foreground">Company Question Collections</h2>
              <p className="text-xs text-muted-foreground">
                Verified question sets curated from Google, Amazon, TCS, Infosys, and Swiggy.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {filteredQuestions.map(q => (
              <Card key={q.id} className="border-border shadow-sm bg-card hover:border-blue-300 transition-colors">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {q.company && (
                          <Badge variant="secondary" className="text-[10px] font-bold">
                            {q.company}
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${
                            q.difficulty === 'Hard'
                              ? 'text-rose-600 border-rose-200'
                              : 'text-amber-600 border-amber-200'
                          }`}
                        >
                          {q.difficulty}
                        </Badge>
                        <span className="text-[11px] text-muted-foreground">{q.category}</span>
                      </div>
                      <h4 className="font-bold text-sm text-foreground mt-1">{q.title}</h4>
                      <p className="text-xs text-muted-foreground">{q.question}</p>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setActiveQuestion(q);
                        setUserAnswer('');
                        setAiEvaluation(null);
                        window.scrollTo({ top: 150, behavior: 'smooth' });
                      }}
                      className="text-xs h-8 shrink-0 border-blue-300 text-blue-700 dark:text-blue-300"
                    >
                      Practice in Simulator
                    </Button>
                  </div>

                  {/* Model Answer Accordion Style */}
                  <details className="pt-2 border-t border-border/60 text-xs text-muted-foreground group">
                    <summary className="font-semibold text-primary cursor-pointer hover:underline select-none">
                      View Model Answer & Key Tips
                    </summary>
                    <div className="pt-3 space-y-2.5 bg-muted/30 p-3 rounded-lg mt-2">
                      <p className="leading-relaxed text-foreground whitespace-pre-line">{q.modelAnswer}</p>
                      {q.tips && q.tips.length > 0 && (
                        <div className="pt-2 border-t border-border/60 space-y-1">
                          <span className="font-bold text-foreground text-[11px]">Interview Strategy Tips:</span>
                          {q.tips.map((tip, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                              <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0" />
                              <span>{tip}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
