import Link from 'next/link';

import { ROUTES } from '@/constants/router';

import s from './style.module.scss';

export default function CategoryArea() {
  return (
    <div className={s.categoryListWrapper}>
      <h3 className={s.categoryLabel}>카테고리</h3>
      <div className={s.categoryBox}>
        <Link type="button" className={`${s.categoryButton} ${s.domestic}`} href={`${ROUTES.search}?categoryId=1`}>
          <span>국내 여행</span>
        </Link>
        <Link type="button" className={`${s.categoryButton} ${s.foreign}`} href={`${ROUTES.search}?categoryId=2`}>
          <span>해외 여행</span>
        </Link>
      </div>
    </div>
  );
}
