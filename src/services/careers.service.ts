import { supabase } from '../integrations/supabase/client';
import type { JobListing, JobApplication, SavedJob } from '../types';

export const CareersService = {
  async getActiveJobs(): Promise<JobListing[]> {
    const { data, error } = await (supabase as any)
      .from('jobs')
      .select('*')
      .eq('status', 'active')
      .order('posted_at', { ascending: false });

    if (error) {
      console.warn('[CareersService.getActiveJobs] Failed:', error.message);
      return [];
    }
    return (data as JobListing[]) || [];
  },

  async getUserApplications(userId: string): Promise<JobApplication[]> {
    const { data, error } = await (supabase as any)
      .from('job_applications')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.warn(`[CareersService.getUserApplications] Failed for ${userId}:`, error.message);
      return [];
    }
    return (data as JobApplication[]) || [];
  },

  async applyToJob(application: Partial<JobApplication>): Promise<boolean> {
    const { error } = await (supabase as any)
      .from('job_applications')
      .insert([application]);

    if (error) {
      console.warn('[CareersService.applyToJob] Failed:', error.message);
      return false;
    }
    return true;
  },
};
