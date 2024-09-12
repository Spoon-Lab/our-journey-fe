import Link from 'next/link';

import s from './style.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: LayoutProps) {
  return (
    <div className={s.layoutContainer}>
      <div className={s.mainContainer}>
        {children}
        <footer className={s.footerWrapper}>
          <button type="button">로그아웃</button>
          <button type="button">회원탈퇴</button>
        </footer>
      </div>
    </div>
  );
}
