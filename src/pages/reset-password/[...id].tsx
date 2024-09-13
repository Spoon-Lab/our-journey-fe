import type { ReactNode } from 'react';

import AuthHeader from '@/components/auth-header';
import AuthIntroText from '@/components/auth-Intro-text';
import AuthLayout from '@/components/layouts/auth-layout';

import ResetForm from './components/reset-form';

import s from './style.module.scss';

export default function CreatePassword() {
  return (
    <main className={s.searchContainer}>
      <AuthIntroText text="새 비밀번호를 입력하세요" />
      <ResetForm />
    </main>
  );
}

CreatePassword.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <AuthHeader text="비밀번호 재설정" />
    {page}
  </AuthLayout>
);
