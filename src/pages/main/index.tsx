import type { MouseEvent, ReactNode } from 'react';
import { useState } from 'react';

import FeedGrid from '@/components/feed-grid';
import DefaultLayout from '@/components/layouts';
import NavBar from '@/components/nav-bar';

import SortContainer from './component/sort-container';
import TopBanner from './component/top-banner';
import useGetFeed from '../../hooks/use-get-feed';

import s from './style.module.scss';

export default function Main() {
  const [sort, setSort] = useState<'recently' | 'popularly'>('recently');
  const { data } = useGetFeed();

  const handleListToSort = (e: MouseEvent<HTMLButtonElement>) => {
    setSort(e.currentTarget.id as 'recently' | 'popularly');
  };

  if (!data) {
    return <div />;
  }

  return (
    <section className={s.mainWrapper}>
      <TopBanner />
      <div className={s.feedWrapper}>
        <SortContainer handle={handleListToSort} sort={sort} />
        {data.pages.map((content) => (
          <FeedGrid key={content.pageable.pageNumber} data={content.content} />
        ))}
      </div>
      <NavBar />
    </section>
  );
}

Main.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
