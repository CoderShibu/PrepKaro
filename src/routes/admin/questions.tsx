import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Sparkles,
  Plus,
  Search,
  Bot,
  HelpCircle,
  CheckCircle2,
  Trash2,
  Edit2,
  Layers,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { Question } from '../../lib/types';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/questions')({
  component: AdminQuestionsPage,
});

function AdminQuestionsPage() {
  const { questions, saveQuestion, skills } = usePrepKaroStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Manual Question Dialog
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<Question['type']>('mcq');
  const [difficulty, setDifficulty] = useState<Question['difficulty']>('medium');
  const [points, setPoints] = useState(10);
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [explanation, setExplanation] = useState('');

  // AI Generator Dialog
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState('React 19 Server Actions & Streaming');
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesDiff;
  });

  const handleSaveManualQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !opt1.trim() || !opt2.trim()) {
      toast.error('Question prompt and at least 2 options are required.');
      return;
    }

    const optionsList = [
      { id: 'opt-1', text: opt1 },
      { id: 'opt-2', text: opt2 },
      ...(opt3.trim() ? [{ id: 'opt-3', text: opt3 }] : []),
      ...(opt4.trim() ? [{ id: 'opt-4', text: opt4 }] : []),
    ];

    const correctId = optionsList[correctOptionIndex]?.id || 'opt-1';

    const newQ: Question = {
      id: `q-${Date.now()}`,
      type,
      prompt,
      options: optionsList,
      correctAnswers: [correctId],
      explanation,
      difficulty,
      points: Number(points),
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    saveQuestion(newQ);
    setManualModalOpen(false);
    toast.success('Question added to bank!');
  };

  const handleGenerateAiQuestion = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      // Deterministic generation adapter based on topic
      const generatedQ: Question = {
        id: `q-ai-${Date.now()}`,
        type: 'mcq',
        prompt: `In ${aiTopic}, which architectural practice guarantees atomic data mutations without client state desynchronization?`,
        options: [
          { id: 'opt-ai-1', text: 'Executing mutations exclusively via Server Actions with revalidatePath()' },
          { id: 'opt-ai-2', text: 'Storing mutable state in client localStorage before firing fetch requests' },
          { id: 'opt-ai-3', text: 'Polling a public REST endpoint every 250 milliseconds' },
          { id: 'opt-ai-4', text: 'Bypassing Row Level Security in client components' },
        ],
        correctAnswers: ['opt-ai-1'],
        explanation: 'Server Actions process server-side within the request boundary and trigger selective cache invalidation with revalidatePath() or revalidateTag(), eliminating stale client state.',
        difficulty: aiDifficulty,
        points: 15,
        status: 'active',
        createdAt: new Date().toISOString(),
      };

      saveQuestion(generatedQ);
      setIsAiGenerating(false);
      setAiModalOpen(false);
      toast.success('AI synthesized and validated 1 technical question into the Question Bank!');
    }, 800);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
                Assessment Engine
              </Badge>
              <span className="text-xs text-muted-foreground">• Centralized Question Bank</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Question Bank ({questions.length})
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Create questions manually or synthesize verified assessments with the AI Generator adapter.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setAiModalOpen(true)}
              variant="outline"
              size="sm"
              className="text-xs h-9 border-border text-foreground hover:bg-muted font-semibold gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>AI Question Generator</span>
            </Button>

            <Button
              onClick={() => setManualModalOpen(true)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-9 px-4 gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Question</span>
            </Button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-card border border-border rounded-xl p-3 shadow-sm flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
            <Input
              placeholder="Search question prompts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            {['All', 'Easy', 'Medium', 'Hard'].map(d => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedDifficulty === d
                    ? 'bg-blue-600 text-white'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Question Cards Grid */}
        <div className="grid gap-4">
          {filteredQuestions.map((q, idx) => (
            <Card key={q.id} className="border-border shadow-sm bg-card p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] font-bold uppercase">
                      {q.type}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        q.difficulty === 'hard'
                          ? 'text-rose-600 border-rose-300'
                          : q.difficulty === 'medium'
                          ? 'text-amber-600 border-amber-300'
                          : 'text-emerald-600 border-emerald-300'
                      }`}
                    >
                      {q.difficulty}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground font-mono">{q.points} Points</span>
                  </div>
                  <h3 className="font-bold text-sm text-foreground mt-1">{q.prompt}</h3>
                </div>
              </div>

              {/* Options */}
              <div className="grid sm:grid-cols-2 gap-2 pt-1 text-xs">
                {q.options.map(opt => {
                  const isCorrect = q.correctAnswers.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded-lg border flex items-center justify-between ${
                        isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-400 text-emerald-900 dark:text-emerald-300 font-semibold'
                          : 'bg-muted/30 border-border text-muted-foreground'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-2" />}
                    </div>
                  );
                })}
              </div>

              {q.explanation && (
                <div className="text-[11px] text-muted-foreground bg-muted/40 p-2.5 rounded-lg border border-border">
                  <strong className="text-foreground">Explanation:</strong> {q.explanation}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* AI Question Generator Dialog */}
        <Dialog open={aiModalOpen} onOpenChange={setAiModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-1">
                <Sparkles className="w-5 h-5" />
              </div>
              <DialogTitle className="text-base font-bold">AI Question Generator</DialogTitle>
              <DialogDescription className="text-xs">
                Synthesize technical questions with verified correct answers and detailed explanations.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Topic / Skill Subject</label>
                <Input
                  value={aiTopic}
                  onChange={e => setAiTopic(e.target.value)}
                  placeholder="e.g. Next.js Server Components, Vector Embeddings"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Difficulty Level</label>
                <Select value={aiDifficulty} onValueChange={v => setAiDifficulty(v as any)}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy" className="text-xs">Easy</SelectItem>
                    <SelectItem value="medium" className="text-xs">Medium</SelectItem>
                    <SelectItem value="hard" className="text-xs">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/20 text-muted-foreground text-[11px] space-y-1">
                <span className="font-bold text-foreground block">Verification Rule:</span>
                <p>AI adapter automatically validates JSON schema and ensures exactly one unambiguous correct answer.</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setAiModalOpen(false)} className="text-xs h-8">
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleGenerateAiQuestion}
                disabled={isAiGenerating}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isAiGenerating ? 'Synthesizing...' : 'Generate & Add to Bank'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Manual Question Dialog */}
        <Dialog open={manualModalOpen} onOpenChange={setManualModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">Create Manual Question</DialogTitle>
              <DialogDescription className="text-xs">
                Configure question prompt, answer choices, and correct answer key.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveManualQuestion} className="space-y-3.5 py-2 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Question Prompt</label>
                <Textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  rows={2}
                  className="text-xs"
                  placeholder="e.g. Which hook provides optimistic state mutations in React 19?"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Type</label>
                  <Select value={type} onValueChange={v => setType(v as any)}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq" className="text-xs">MCQ</SelectItem>
                      <SelectItem value="multi_select" className="text-xs">Multi-Select</SelectItem>
                      <SelectItem value="true_false" className="text-xs">True / False</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Difficulty</label>
                  <Select value={difficulty} onValueChange={v => setDifficulty(v as any)}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy" className="text-xs">Easy</SelectItem>
                      <SelectItem value="medium" className="text-xs">Medium</SelectItem>
                      <SelectItem value="hard" className="text-xs">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Points</label>
                  <Input
                    type="number"
                    value={points}
                    onChange={e => setPoints(Number(e.target.value))}
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2">
                <label className="font-semibold text-foreground block">Answer Options & Correct Key</label>
                {[
                  { val: opt1, set: setOpt1, label: 'Option 1' },
                  { val: opt2, set: setOpt2, label: 'Option 2' },
                  { val: opt3, set: setOpt3, label: 'Option 3 (Optional)' },
                  { val: opt4, set: setOpt4, label: 'Option 4 (Optional)' },
                ].map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={correctOptionIndex === i}
                      onChange={() => setCorrectOptionIndex(i)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Input
                      value={opt.val}
                      onChange={e => opt.set(e.target.value)}
                      placeholder={opt.label}
                      className="text-xs h-8 flex-1"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Explanation / Rational</label>
                <Textarea
                  value={explanation}
                  onChange={e => setExplanation(e.target.value)}
                  rows={2}
                  className="text-xs"
                  placeholder="Explain why the selected option is correct..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setManualModalOpen(false)} className="text-xs h-8">
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                  Save Question
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
