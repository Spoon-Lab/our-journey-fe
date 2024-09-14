import type { MouseEvent } from 'react';
import { useRouter } from 'next/router';

import { useCurrentKeyword } from '@/hooks/use-current-keyword';

import s from './style.module.scss';

export default function CurrentSearchArea() {
  const { keywordList, setCurrentKeyword, setKeywordList } = useCurrentKeyword();
  const router = useRouter();

  const handleMoveToPage = (e: MouseEvent<HTMLButtonElement>) => {
    setCurrentKeyword(e.currentTarget.id);
    return router.push(`/search?title=${e.currentTarget.id}`);
  };

  // * TODO: 모달 디자인 나오면 삭제 여부 물어볼지 띄우도록 유도
  const handleRemoveALLList = () => {
    localStorage.removeItem('currentKeywordList');
    return setKeywordList([]);
  };

  return (
    <div className={s.currentSearchArea}>
      <div className={s.categoryBox}>
        <h3 className={s.categoryLabel}>최근에 검색하셨어요</h3>
        <button type="button" className={s.clearButton} onClick={handleRemoveALLList}>
          전체 삭제
        </button>
      </div>
      <div className={s.hashtagBox}>
        {keywordList?.map((keyword) => (
          <button id={keyword} key={keyword} type="button" className={s.hashtagButton} onClick={handleMoveToPage}>
            {`#${keyword}`}
          </button>
        ))}
      </div>
    </div>
  );
}
