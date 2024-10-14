import React from 'react';
import Link from 'next/link';

import { ROUTES } from '@/constants/router';

import AuthIntroText from '@/components/auth-Intro-text';

import s from './style.module.scss';

interface EmailProps {
  type: 'signup' | 'reset-password';
}

export default function ConfirmEmail({ type }: EmailProps) {
  return (
    <main className={s.emailContainer}>
      {type === 'signup' ? (
        <AuthIntroText text="확인 이메일을 발송했습니다" subText="메일이 도착하지 않았다면 스팸함을 확인해주세요" />
      ) : (
        <AuthIntroText text={'비밀번호 재설정 링크를 \n보냈습니다'} subText="이메일의 링크를 클릭해 계속 진행해 주세요." />
      )}
      <Link href={ROUTES.login}>로그인하러 가기</Link>
    </main>
  );
}
