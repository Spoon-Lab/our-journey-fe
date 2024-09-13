import type { ReactNode } from 'react';
import Link from 'next/link';

import { ROUTER } from '@/constants/router';

import AuthHeader from '@/components/auth-header';
import AuthIntroText from '@/components/auth-Intro-text';
import AuthLayout from '@/components/layouts/auth-layout';

import s from './style.module.scss';

export default function Email() {
  return (
    <main className={s.emailContainer}>
      <AuthIntroText text={'비밀번호 재설정 링크를 \n보냈습니다'} subText="이메일의 링크를 클릭해 계속 진행해 주세요." />
      <Link href={ROUTER.login}>로그인하러가기</Link>
    </main>
  );
}

Email.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <AuthHeader />
    {page}
  </AuthLayout>
);
