import { supabase } from '../integrations/supabase/client';
import type { UserProfile, UserRole } from '../types';

export const AuthService = {
  async getCurrentSession() {
    return await supabase.auth.getSession();
  },

  async signOut() {
    return await supabase.auth.signOut();
  },

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await (supabase as any)
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.warn(`[AuthService.getUserProfile] Failed for ${userId}:`, error.message);
      return null;
    }
    return (data as UserProfile) || null;
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<boolean> {
    const { error } = await (supabase as any)
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) {
      console.warn(`[AuthService.updateProfile] Failed for ${userId}:`, error.message);
      return false;
    }
    return true;
  },
};
