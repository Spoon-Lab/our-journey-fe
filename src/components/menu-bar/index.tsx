import Link from 'next/link';
import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/router';

import s from './style.module.scss';

import { HomeIcon, MenuIcon, MenuSearchIcon } from '@/assets/icons';

export default function MenuBar({ pk }: { pk: number }) {
  const router = useRouter();

  const isActive = (href: string) => router.pathname.startsWith(href);

  // TODO:link 카테고리 주소 변경
  return (
    <nav className={s.navWrapper}>
      <Link href={ROUTES.main} className={`${s.link} ${isActive(ROUTES.main) ? s.active : ''}`}>
        <HomeIcon />
        <p>홈</p>
      </Link>
      <Link href={ROUTES.category} className={`${s.link} ${isActive(ROUTES.category) ? s.active : ''}`}>
        <MenuSearchIcon />
        <p>카테고리</p>
      </Link>
      <Link href={`${ROUTES.profile}/${pk}`} className={`${s.link} ${isActive(ROUTES.profile) ? s.active : ''}`}>
        <MenuIcon />
        <p>메뉴</p>
      </Link>
    </nav>
  );
}
