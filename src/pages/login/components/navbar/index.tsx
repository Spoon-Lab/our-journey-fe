import Link from 'next/link';

import { ROUTES } from '@/constants/router';

import s from './style.module.scss';

export default function Navbar() {
  return (
    <nav className={s.navWrapper}>
      <Link href={ROUTES.resetPassword}>비밀번호 찾기</Link>
      <span />
      <Link href={ROUTES.signup}>회원가입 하기</Link>
    </nav>
  );
}
