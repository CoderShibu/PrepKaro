import { supabase } from '../integrations/supabase/client';
import type { Submission } from '../types';

export const SubmissionsService = {
  async getUserSubmissions(userId: string): Promise<Submission[]> {
    const { data, error } = await (supabase as any)
      .from('submissions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn(`[SubmissionsService.getUserSubmissions] Failed for ${userId}:`, error.message);
      return [];
    }
    return (data as Submission[]) || [];
  },

  async createSubmission(submission: Partial<Submission>): Promise<Submission | null> {
    const { data, error } = await (supabase as any)
      .from('submissions')
      .insert([submission])
      .select()
      .single();

    if (error) {
      console.warn('[SubmissionsService.createSubmission] Failed:', error.message);
      return null;
    }
    return (data as Submission) || null;
  },

  async updateEvaluation(id: string, evaluation: Partial<Submission>): Promise<boolean> {
    const { error } = await (supabase as any)
      .from('submissions')
      .update(evaluation)
      .eq('id', id);

    if (error) {
      console.warn(`[SubmissionsService.updateEvaluation] Failed for ${id}:`, error.message);
      return false;
    }
    return true;
  },
};
