import Link from 'next/link';
import { signIn } from 'next-auth/react';

import Button from '@/components/button/button';

import s from './style.module.scss';

import { Google } from '@/assets/icons';

export default function Home() {
  return (
    <main className={s.homeContainer}>
      <div className={s.textWrapper}>
        <h1>
          OUR
          <br />
          JOURNEY
        </h1>
        <p>그들의 여행 살짝 맛보기</p>
      </div>
      <div className={s.authWrapper}>
        <div className={s.buttonWrapper}>
          <Button onClick={() => signIn()}>
            <div className={s.googleBox}>
              <Google />
              <p>구글로 로그인하기</p>
            </div>
          </Button>
          <Button>이메일로 로그인하기</Button>
        </div>
        <div className={s.signUpBox}>
          <p>아직 회원이 아니신가요?</p>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </main>
  );
}
