import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import { ROUTES } from '@/constants/router';

import Button from '@/components/button';

import s from './style.module.scss';

import { Google } from '@/assets/icons';

export default function Home() {
  const nav = useRouter();

  // NOTE: (33) 첫 로그인 시 localStorage에 만료된 accessToken이 있을 경우, 무한 refresh loop에 빠지는 문제가 있습니다.
  // 때문에 우선 accessToken이 있을 경우 main 페이지로 이동하도록 코드를 추가하였습니다.
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      void nav.push(ROUTES.main);
    }
  }, [nav]);

  return (
    <main className={s.homeContainer}>
      <div className={s.textWrapper}>
        <h1>
          OUR
          <br />
          JOURNEY
        </h1>
        <p>함께 돌아보는 우리의 여행</p>
      </div>
      <div className={s.authWrapper}>
        <div className={s.buttonWrapper}>
          <Button onClick={() => signIn('google')}>
            <div className={s.googleBox}>
              <Google />
              <p>구글로 로그인하기</p>
            </div>
          </Button>
          <Button onClick={() => nav.push(ROUTES.login)}>이메일로 로그인하기</Button>
        </div>
        <div className={s.signUpBox}>
          <p>아직 회원이 아니신가요?</p>
          <Link href={ROUTES.signup}>회원가입</Link>
        </div>
      </div>
    </main>
  );
}
