import { usePrepKaroStore } from '../lib/store';
import type { Submission } from '../types';

export function useSubmissions(userId?: string) {
  const store = usePrepKaroStore();
  const effectiveUserId = userId || store.currentUser?.id;

  const submissions = effectiveUserId
    ? store.submissions.filter((s) => s.userId === effectiveUserId)
    : store.submissions;

  return {
    submissions,
    submitWork: store.submitWork,
    evaluateSubmission: store.evaluateSubmission,
    publishToPortfolio: store.publishToPortfolio,
  };
}
