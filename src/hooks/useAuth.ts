import { usePrepKaroStore } from '../lib/store';
import type { UserRole } from '../types';

export function useAuth() {
  const currentUser = usePrepKaroStore((s) => s.currentUser);
  const switchUserRole = usePrepKaroStore((s) => s.switchUserRole);

  return {
    user: currentUser,
    role: currentUser?.role as UserRole | undefined,
    isAuthenticated: !!currentUser,
    isStudent: currentUser?.role === 'student',
    isReviewer: currentUser?.role === 'reviewer',
    isAdmin: currentUser?.role === 'admin',
    switchRole: switchUserRole,
  };
}
