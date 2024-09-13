import type { MouseEvent } from 'react';
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

  const handleMoveToPage = (e: MouseEvent<HTMLButtonElement>) => router.push(e.currentTarget.id);

  return (
    <div className={s.navBarContainer}>
      <button id={ROUTES.main} type="button" className={`${s.navBarButton} ${mainPath ? s.currentPage : ''}`} onClick={handleMoveToPage}>
        <HomeIcon />
        <span className={`${s.buttonText} ${mainPath ? s.currentPage : ''}`}>홈</span>
      </button>
      <button id={ROUTES.category} type="button" className={`${s.navBarButton} ${categoryPath ? s.currentPage : ''}`} onClick={handleMoveToPage}>
        <CategoryIcon />
        <span className={`${s.buttonText} ${categoryPath ? s.currentPage : ''}`}>카테고리</span>
      </button>
      <button id={ROUTES.setting} type="button" className={`${s.navBarButton} ${settingPath ? s.currentPage : ''}`} onClick={handleMoveToPage}>
        <MenuIcon />
        <span className={`${s.buttonText} ${settingPath ? s.currentPage : ''}`}>메뉴</span>
      </button>
      {mainPath && (
        <button id={ROUTES.create} aria-label="글 작성" type="button" className={s.fab} onClick={handleMoveToPage}>
          <AddIcon />
        </button>
      )}
    </div>
  );
}
