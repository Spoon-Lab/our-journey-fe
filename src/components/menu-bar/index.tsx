import Link from 'next/link';
import { useRouter } from 'next/router';

import { ROUTER } from '@/constants/router';

import s from './style.module.scss';

import { HomeIcon, MenuIcon, SearchIcon } from '@/assets/icons';

export default function MenuBar({ pk }: { pk: number }) {
  const router = useRouter();

  const isActive = (href: string) => router.pathname.startsWith(href);

  // TODO:link 카테고리 주소 변경
  return (
    <nav className={s.navWrapper}>
      <Link href={ROUTER.main} className={`${s.link} ${isActive(ROUTER.main) ? s.active : ''}`}>
        <HomeIcon />
        <p>홈</p>
      </Link>
      <Link href={ROUTER.main} className={`${s.link} ${isActive(ROUTER.main) ? s.active : ''}`}>
        <SearchIcon />
        <p>카테고리</p>
      </Link>
      <Link href={`${ROUTER.profile}/${pk}`} className={`${s.link} ${isActive(ROUTER.profile) ? s.active : ''}`}>
        <MenuIcon />
        <p>메뉴</p>
      </Link>
    </nav>
  );
}
