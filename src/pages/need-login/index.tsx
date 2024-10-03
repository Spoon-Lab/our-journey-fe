import type { ReactNode } from 'react';
import Link from 'next/link';

import { ROUTES } from '@/constants/router';

import AuthHeader from '@/components/auth-header';
import AuthLayout from '@/components/layouts/auth-layout';

import s from './style.module.scss';

export default function NeedLogin() {
  return (
    <main className={s.loginContainer}>
      <div className={s.textContainer}>
        <hr />
        <h1>{`해당 기능을 이용하려면\n회원 가입이 필요해요!!`}</h1>
        <p>{`회원가입하고 아워저니를\n더 신나게 즐겨보세요!`}</p>
        <p>{`이미 서비스에 가입하셨다면,\n로그인 화면으로 돌아가 로그인을 진행해주세요!`}</p>
      </div>
      <div className={s.moveLinkBox}>
        <Link href={ROUTES.login} className={s.moveLink}>
          <span>로그인</span>
        </Link>
        <Link href={ROUTES.signup} className={s.moveLink}>
          <span>회원가입</span>
        </Link>
      </div>
    </main>
  );
}

NeedLogin.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <AuthHeader />
    {page}
  </AuthLayout>
);
