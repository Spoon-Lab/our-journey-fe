import type { ReactNode } from 'react';

import AuthHeader from '@/components/auth-header';
import AuthIntroText from '@/components/auth-Intro-text';
import AuthLayout from '@/components/layouts/auth-layout';

import SignupForm from './(components)/signup-form';

import s from './style.module.scss';

export default function Signup() {
  return (
    <main className={s.signUpContainer}>
      <AuthIntroText text={`이메일로 간편하게 가입하고\n아워저니를 즐겨보세요`} />
      <SignupForm />
    </main>
  );
}

Signup.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <AuthHeader />
    {page}
  </AuthLayout>
);
