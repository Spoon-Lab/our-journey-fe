import type { ReactNode } from 'react';
import React from 'react';

import AuthLayout from '@/components/layouts/auth-layout/auth-layout';

export default function SignupPage() {
  return <div>회원가입</div>;
}

SignupPage.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
