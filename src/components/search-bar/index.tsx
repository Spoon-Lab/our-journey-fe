import type { ChangeEvent, FormEvent, InputHTMLAttributes } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { emojiRegex } from '@/constants/regex';
import { ROUTES } from '@/constants/router';

import { useActiveScroll } from '@/hooks/contents/ui/use-active-scroll';
import { useCurrentKeyword } from '@/hooks/contents/use-current-keyword';

import s from './style.module.scss';

import { SearchIcon } from '@/assets/icons';

interface InterfaceProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'button' | 'input';
}

export default function SearchBar(props: InterfaceProps) {
  const { type = 'input' } = props;
  const { setCurrentKeyword } = useCurrentKeyword();
  const { searchbarRef, isScroll } = useActiveScroll();
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setKeyword(value.replace(emojiRegex, '').replace(/\s+/g, '_').trim());
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCurrentKeyword(keyword);
    return router.push(`/search?title=${keyword.trim()}`);
  };

  const handleMoveToCatetory = () => router.push(`${ROUTES.category}`);

  switch (type) {
    case 'button':
      return (
        <div className={`${s.searchBarWrapper} ${isScroll ? s.active : ''}`} ref={searchbarRef}>
          <button type="button" className={s.searchBarButton} onClick={handleMoveToCatetory}>
            <span>여정을 검색해보세요</span>
            <div className={s.iconBox}>
              <SearchIcon width={20} height={20} />
            </div>
          </button>
          <div />
        </div>
      );
    default:
      return (
        <form className={s.searchBarContainer} onSubmit={handleSearchSubmit}>
          <label htmlFor="searchBar" className={s.searchLabel}>
            검색창
          </label>
          <input className={s.searchInput} id="searchBar" placeholder="해시태그 검색하기" value={keyword} onChange={handleOnChange} />

          <button type="submit" className={s.searchButton} aria-label="검색">
            <SearchIcon width={20} height={20} />
          </button>
        </form>
      );
  }
}
