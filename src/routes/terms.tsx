import { createFileRoute } from '@tanstack/react-router';
import { TermsOfServicePage } from '../pages/public/TermsOfServicePage';

export const Route = createFileRoute('/terms')({
  component: TermsOfServicePage,
});
