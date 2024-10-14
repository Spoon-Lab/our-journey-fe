import type { ReactNode } from 'react';

import AuthHeader from '@/components/auth-header';
import AuthLayout from '@/components/layouts/auth-layout';

import ConfirmEmail from '@/pages/reset-password/components/confirm-email';

function SignUpConfirm() {
  return <ConfirmEmail type="signup" />;
}

SignUpConfirm.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <AuthHeader />
    {page}
  </AuthLayout>
);

export default SignUpConfirm;
