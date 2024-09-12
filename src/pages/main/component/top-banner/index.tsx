import SearchBar from '@/components/search-bar';

import s from './style.module.scss';

import { ChevronForwardIcon } from '@/assets/icons/icons';

export default function TopBanner() {
  return (
    <header className={s.topBannerContainer}>
      <img
        alt="top banner"
        src="https://images.unsplash.com/photo-1719937206498-b31844530a96?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className={s.headerThumbnail}
      />
      ``
      <SearchBar type="button" />
      <div className={s.buttonBox}>
        <button type="button" className={s.button}>
          <span>모공님의 여행스토리 감상하기</span>
          <ChevronForwardIcon />
        </button>
      </div>
    </header>
  );
}
