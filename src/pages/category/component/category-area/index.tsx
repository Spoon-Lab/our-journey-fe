import Link from 'next/link';

import { ROUTES } from '@/constants/router';

import s from './style.module.scss';

export default function CategoryArea() {
  return (
    <div className={s.categoryListWrapper}>
      <h3 className={s.categoryLabel}>카테고리</h3>
      <div className={s.categoryBox}>
        <Link type="button" className={s.categoryButton} href={`${ROUTES.search}?id=domestic`}>
          국내 여행
        </Link>
        <Link type="button" className={s.categoryButton} href={`${ROUTES.search}?id=foreign`}>
          해외 여행
        </Link>
      </div>
    </div>
  );
}
