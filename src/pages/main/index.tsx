import { type MouseEvent, type ReactNode, useRef } from 'react';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

import DefaultLayout from '@/components/layouts';
import NavBar from '@/components/nav-bar';

import FeedGrid from './component/feed-grid';
import SortContainer from './component/sort-container';
import TopBanner from './component/top-banner';
import useGetFeed from '../../hooks/use-get-feed';

import s from './style.module.scss';

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

  return (
    <>
      <section className={s.mainWrapper}>
        <TopBanner />
        <div className={s.feedWrapper}>
          <SortContainer handle={handleListToSort} sort={sort} />
          {data?.pages.map((content) => <FeedGrid key={content.pageable.pageNumber} data={content.content} />)}
          <div className={s.refArea} ref={divRef} />
          {/* <div style={{ width: '100%', height: '180px' }} ref={divRef} /> */}
        </div>
      </section>
      <NavBar />
    </>
  );
}

Main.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
