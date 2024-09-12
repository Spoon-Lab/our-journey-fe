import s from './style.module.scss';

import { AddIcon, CategoryIcon, HomeIcon, MenuIcon } from '@/assets/icons/icons';

export default function NavBar() {
  return (
    <div className={s.navBarContainer}>
      <button type="button" className={s.navBarButton}>
        <HomeIcon />
        <span className={s.buttonText}>홈</span>
      </button>
      <button type="button" className={s.navBarButton}>
        <CategoryIcon />
        <span className={s.buttonText}>카테고리</span>
      </button>
      <button type="button" className={s.navBarButton}>
        <MenuIcon />
        <span className={s.buttonText}>메뉴</span>
      </button>
      <button aria-label="글 작성" type="button" className={s.fab}>
        <AddIcon />
      </button>
    </div>
  );
}
