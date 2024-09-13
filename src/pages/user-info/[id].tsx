import type { ReactNode } from 'react';

import AuthHeader from '@/components/auth-header';
import AuthIntroText from '@/components/auth-Intro-text';
import AuthLayout from '@/components/layouts/auth-layout';

import InfoForm from './components/info-form';

import s from './style.module.scss';

export default function UserInfo() {
  return (
    <main className={s.userInfoContainer}>
      <AuthIntroText text={`알찬 아워저니 생활을 위해\n프로필 정보를 등록해주세요!`} />
      <InfoForm />
    </main>
  );
}

UserInfo.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <AuthHeader text="회원정보 입력" />
    {page}
  </AuthLayout>
);
