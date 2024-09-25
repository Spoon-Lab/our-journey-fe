import type { ReactNode } from 'react';

import AuthHeader from '@/components/auth-header';
import AuthIntroText from '@/components/auth-Intro-text';
import AuthLayout from '@/components/layouts/auth-layout';

import LoginForm from './(components)/login-form';
import Navbar from './(components)/navbar';

import s from './style.module.scss';

export default function Login() {
  return (
    <main className={s.loginContainer}>
      <AuthIntroText text={`아워저니와 함께\n신나는 여정을 시작해볼까요?`} />
      <LoginForm />
      <Navbar />
    </main>
  );
}

Login.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <AuthHeader />
    {page}
  </AuthLayout>
);
