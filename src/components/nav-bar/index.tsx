import type { MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/router';

import s from './style.module.scss';

import { AddIcon, CategoryIcon, HomeIcon, MenuIcon } from '@/assets/icons/icons';

export default function NavBar() {
  const router = useRouter();

  const { pathname } = router;
  const mainPath = pathname === ROUTES.main;
  const categoryPath = pathname === ROUTES.category || pathname === ROUTES.search;
  const settingPath = pathname === ROUTES.setting;

  return (
    <div className={s.navBarContainer}>
      <Link id={ROUTES.main} type="button" className={`${s.navBarButton} ${mainPath ? s.currentPage : ''}`} href={ROUTES.main}>
        <HomeIcon />
        <span className={`${s.buttonText} ${mainPath ? s.currentPage : ''}`}>홈</span>
      </Link>
      <Link id={ROUTES.category} type="button" className={`${s.navBarButton} ${categoryPath ? s.currentPage : ''}`} href={ROUTES.category}>
        <CategoryIcon />
        <span className={`${s.buttonText} ${categoryPath ? s.currentPage : ''}`}>카테고리</span>
      </Link>
      <Link id={ROUTES.setting} type="button" className={`${s.navBarButton} ${settingPath ? s.currentPage : ''}`} href={ROUTES.setting}>
        <MenuIcon />
        <span className={`${s.buttonText} ${settingPath ? s.currentPage : ''}`}>메뉴</span>
      </Link>
      {mainPath && (
        <Link id={ROUTES.create} aria-label="글 작성" type="button" className={s.fab} href={ROUTES.create}>
          <AddIcon />
        </Link>
      )}
    </div>
  );
}
