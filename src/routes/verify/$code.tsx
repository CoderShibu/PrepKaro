import { createFileRoute } from '@tanstack/react-router';
import { CertificateVerificationPage } from '../../pages/public/CertificateVerificationPage';

export const Route = createFileRoute('/verify/$code')({
  component: CertificateVerificationPage,
});
