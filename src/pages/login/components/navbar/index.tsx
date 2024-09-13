import Link from 'next/link';

import { ROUTER } from '@/constants/router';

import s from './style.module.scss';

export default function Navbar() {
  return (
    <nav className={s.navWrapper}>
      <Link href={ROUTER.resetPassword}>비밀번호 찾기</Link>
      <span />
      <Link href={ROUTER.signup}>회원가입 하기</Link>
    </nav>
  );
}
