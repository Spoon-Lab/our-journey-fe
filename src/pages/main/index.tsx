import type { MouseEvent, ReactNode } from 'react';
import { useState } from 'react';

import DefaultLayout from '@/components/layouts';

import FeedGrid from './component/feed-grid';
import SortContainer from './component/sort-container';
import TopBanner from './component/top-banner';
import useGetFeed from '../../hooks/useGetFeed';

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
        <FeedGrid data={data} />
      </div>
    </section>
  );
}

Main.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
