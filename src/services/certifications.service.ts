import { supabase } from '../integrations/supabase/client';
import type { Certificate } from '../types';

export const CertificationsService = {
  async getCertificateByCode(code: string): Promise<Certificate | null> {
    const { data, error } = await (supabase as any)
      .from('certificates')
      .select('*')
      .eq('code', code)
      .single();

    if (error) {
      console.warn(`[CertificationsService.getCertificateByCode] Failed for ${code}:`, error.message);
      return null;
    }
    return (data as Certificate) || null;
  },

  async getUserCertificates(userId: string): Promise<Certificate[]> {
    const { data, error } = await (supabase as any)
      .from('certificates')
      .select('*')
      .eq('user_id', userId)
      .order('issued_at', { ascending: false });

    if (error) {
      console.warn(`[CertificationsService.getUserCertificates] Failed for ${userId}:`, error.message);
      return [];
    }
    return (data as Certificate[]) || [];
  },
};
