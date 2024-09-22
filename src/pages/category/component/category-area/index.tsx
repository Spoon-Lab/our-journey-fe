import Link from 'next/link';

import { ROUTES } from '@/constants/router';

import { useCategoryList } from '@/hooks/contents/use-category-list';

import s from './style.module.scss';

export default function CategoryArea() {
  const { data } = useCategoryList();

  if (!data) {
    return <div />;
  }

  return (
    <div className={s.categoryListWrapper}>
      <h3 className={s.categoryLabel}>카테고리</h3>
      <div className={s.categoryBox}>
        {data.categoryDtos.map((category) => (
          <Link
            key={category.categoryId}
            type="button"
            className={`${s.categoryButton} ${category.categoryId === 1 ? s.domestic : s.foreign}`}
            href={`${ROUTES.search}?categoryId=${category.categoryId}`}
          >
            <span>{`${category.categoryName} 여행`}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
