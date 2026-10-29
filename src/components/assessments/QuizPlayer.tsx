import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { Question } from '../../types';

interface QuizPlayerProps {
  questions: Question[];
  passScore?: number;
  onSubmit: (answers: Record<string, string | string[]>) => void;
}

export function QuizPlayer({ questions, passScore = 70, onSubmit }: QuizPlayerProps) {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const currentAns = answers[currentQ.id];

  const handleSelect = (optionId: string) => {
    if (currentQ.type === 'multi_select') {
      const arr = Array.isArray(currentAns) ? currentAns : [];
      const updated = arr.includes(optionId)
        ? arr.filter((id) => id !== optionId)
        : [...arr, optionId];
      setAnswers({ ...answers, [currentQ.id]: updated });
    } else {
      setAnswers({ ...answers, [currentQ.id]: optionId });
    }
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold">
          Question {currentIndex + 1} of {questions.length}
        </CardTitle>
        <Badge variant="outline" className="text-xs">
          Pass threshold: {passScore}%
        </Badge>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <h4 className="text-sm font-medium text-foreground">{currentQ.prompt}</h4>

        <div className="space-y-2">
          {currentQ.options.map((opt) => {
            const isSelected =
              currentQ.type === 'multi_select'
                ? Array.isArray(currentAns) && currentAns.includes(opt.id)
                : currentAns === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 font-medium text-foreground'
                    : 'bg-background hover:bg-muted/50 border-input text-foreground'
                }`}
              >
                <span>{opt.text}</span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-input'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((p) => p - 1)}
          >
            Previous
          </Button>

          {currentIndex < questions.length - 1 ? (
            <Button size="sm" onClick={() => setCurrentIndex((p) => p + 1)}>
              Next
            </Button>
          ) : (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => onSubmit(answers)}
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
