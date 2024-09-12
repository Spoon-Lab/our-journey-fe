import type { InputHTMLAttributes } from 'react';

import s from './style.module.scss';

import { SearchIcon } from '@/assets/icons/icons';

interface InterfaceProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'button' | 'input';
}

export default function SearchBar(props: InterfaceProps) {
  const { type = 'input', ...rest } = props;

  switch (type) {
    case 'button':
      return (
        <div className={s.searchBarWrapper}>
          <button type="button" className={s.searchBarButton}>
            <span>여정을 검색해보세요</span>
            <div className={s.iconBox}>
              <SearchIcon />
            </div>
          </button>
          <div />
        </div>
      );
    default:
      return (
        <div className={s.searchBarContainer}>
          <label htmlFor="searchBar" style={{ display: 'none' }}>
            검색창
          </label>
          <input className={s.searchInput} id="searchBar" placeholder="여정을 검색해보세요" />

          <button type="button" className={s.searchButton} aria-label="검색">
            <span>
              <SearchIcon />
            </span>
          </button>
        </div>
      );
  }
}
