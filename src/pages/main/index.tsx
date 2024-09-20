import { type MouseEvent, type ReactNode, useRef } from 'react';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

import FeedGrid from '@/components/feed-grid';
import DefaultLayout from '@/components/layouts';
import NavBar from '@/components/nav-bar';
import SearchBar from '@/components/search-bar';

import BannerCarousel from './component/banner-carousel';
import CreateBox from './component/create-box';
import SortContainer from './component/sort-container';
import useGetFeed from '../../hooks/use-get-feed';

import s from './style.module.scss';

import { Banners } from '@/mocks/banners';

export default function Main() {
  const { data, sort, setSort, fetchNextPage, hasNextPage } = useGetFeed({});
  const divRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    ref: divRef,
    onIntersect: (entry) => {
      if (entry.isIntersecting && hasNextPage) {
        void fetchNextPage();
      }
    },
  });

  const handleListToSort = (e: MouseEvent<HTMLButtonElement>) => {
    setSort(e.currentTarget.id as 'recently' | 'popularly');
  };

  // * 특정 스크롤까지 도달하면 검색창 배경이 어둡게 바뀌는 기능 추가 필요

  return (
    <>
      <section className={s.mainWrapper}>
        <SearchBar type="button" />
        <CreateBox />
        <BannerCarousel data={Banners} />
        <div className={s.feedWrapper}>
          <SortContainer handle={handleListToSort} sort={sort} />
          {data?.pages.map((content) => <FeedGrid key={content.pageable.pageNumber} data={content.content} />)}
          <div className={s.refArea} ref={divRef} />
        </div>
      </section>
      <NavBar />
    </>
  );
}

Main.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
