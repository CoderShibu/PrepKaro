import { createFileRoute } from '@tanstack/react-router';
import { PrivacyPolicyPage } from '../pages/public/PrivacyPolicyPage';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPolicyPage,
});
