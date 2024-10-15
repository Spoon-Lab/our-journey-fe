import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/router';

import s from './style.module.scss';

import { AddIcon, CategoryIcon, HomeIcon, MenuIcon } from '@/assets/icons';

export default function NavBar() {
  const { pathname } = useRouter();
  const [loginState, setLoginState] = useState(false);

  const mainPath = pathname === ROUTES.main;
  const categoryPath = pathname === ROUTES.category || pathname === ROUTES.search;
  const menuPath = pathname === ROUTES.profile;

  useEffect(() => {
    if (localStorage.getItem('accessToken') != null) {
      setLoginState(true);
    }
  }, []);

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
      <Link
        id={ROUTES.profile}
        type="button"
        className={`${s.navBarButton} ${menuPath ? s.currentPage : ''}`}
        href={loginState ? ROUTES.profile : ROUTES.needLogin}
      >
        <MenuIcon />
        <span className={`${s.buttonText} ${menuPath ? s.currentPage : ''}`}>메뉴</span>
      </Link>
      {mainPath && loginState && (
        <Link id={ROUTES.content.create()} aria-label="글 작성" type="button" className={s.fab} href={ROUTES.content.create()}>
          <AddIcon width={36} height={36} />
        </Link>
      )}
    </div>
  );
}
