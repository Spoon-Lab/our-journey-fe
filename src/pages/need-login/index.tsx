import type { ReactNode } from 'react';
import Link from 'next/link';

import { ROUTES } from '@/constants/router';

import AuthHeader from '@/components/auth-header';
import AuthLayout from '@/components/layouts/auth-layout';

import s from './style.module.scss';

export default function Login() {
  return (
    <main className={s.loginContainer}>
      <div className={s.textContainer}>
        <hr />
        <h1>{`해당 기능을 이용하려면\n회원 가입이 필요해요!!`}</h1>
        <p>{`회원가입하고 아워저니를\n더 신나게 즐겨보세요!`}</p>
      </div>
      <Link href={ROUTES.signup} className={s.moveLinkSignUp}>
        <span>회원가입</span>
      </Link>
    </main>
  );
}

Login.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <AuthHeader />
    {page}
  </AuthLayout>
);
