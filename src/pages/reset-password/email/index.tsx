import type { ReactNode } from 'react';

import AuthHeader from '@/components/auth-header';
import AuthLayout from '@/components/layouts/auth-layout';

import ConfirmEmail from '../components/confirm-email';

export default function Email() {
  return <ConfirmEmail type="reset-password" />;
}

Email.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <AuthHeader />
    {page}
  </AuthLayout>
);
