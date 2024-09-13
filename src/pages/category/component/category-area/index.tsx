import type { MouseEvent } from 'react';
import { useRouter } from 'next/router';

import s from './style.module.scss';

export default function CategoryArea() {
  const router = useRouter();

  const handleMovePage = (e: MouseEvent<HTMLButtonElement>) => router.push(`/search?categoryId=${e.currentTarget.id}`);

  return (
    <div style={{ width: '100%', padding: '0 16px' }}>
      <h3 className={s.categoryLabel}>카테고리</h3>
      <div className={s.categoryBox}>
        <button type="button" className={s.categoryButton} id="domestic" name="국내 여행" onClick={handleMovePage}>
          국내 여행
        </button>
        <button type="button" className={s.categoryButton} id="foreign" name="해외 여행" onClick={handleMovePage}>
          해외 여행
        </button>
      </div>
    </div>
  );
}
