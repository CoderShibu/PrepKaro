import { supabase } from '../integrations/supabase/client';
import type { Assessment, AssessmentAttempt, Question } from '../types';

export const AssessmentsService = {
  async getSkillAssessment(skillId: string): Promise<Assessment | null> {
    const { data, error } = await (supabase as any)
      .from('assessments')
      .select('*')
      .eq('skill_id', skillId)
      .single();

    if (error) {
      console.warn(`[AssessmentsService.getSkillAssessment] Failed for ${skillId}:`, error.message);
      return null;
    }
    return (data as Assessment) || null;
  },

  async getQuestions(questionIds: string[]): Promise<Question[]> {
    if (!questionIds.length) return [];
    const { data, error } = await (supabase as any)
      .from('questions')
      .select('*')
      .in('id', questionIds);

    if (error) {
      console.warn('[AssessmentsService.getQuestions] Failed:', error.message);
      return [];
    }
    return (data as Question[]) || [];
  },

  async submitAttempt(attempt: Partial<AssessmentAttempt>): Promise<AssessmentAttempt | null> {
    const { data, error } = await (supabase as any)
      .from('assessment_attempts')
      .insert([attempt])
      .select()
      .single();

    if (error) {
      console.warn('[AssessmentsService.submitAttempt] Failed:', error.message);
      return null;
    }
    return (data as AssessmentAttempt) || null;
  },
};
