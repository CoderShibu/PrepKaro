import { supabase } from '../integrations/supabase/client';
import type { AuditLog, RefundRequest } from '../types';

export const AdminService = {
  async getAuditLogs(): Promise<AuditLog[]> {
    const { data, error } = await (supabase as any)
      .from('audit_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(100);

    if (error) {
      console.warn('[AdminService.getAuditLogs] Failed:', error.message);
      return [];
    }
    return (data as AuditLog[]) || [];
  },

  async getRefundRequests(): Promise<RefundRequest[]> {
    const { data, error } = await (supabase as any)
      .from('refund_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[AdminService.getRefundRequests] Failed:', error.message);
      return [];
    }
    return (data as RefundRequest[]) || [];
  },
};
