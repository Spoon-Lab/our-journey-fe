import type { ReactNode } from 'react';
import { useRouter } from 'next/router';

import useGetFeed from '@/hooks/use-get-feed';

import FeedGrid from '@/components/feed-grid';
import Header from '@/components/header';
import DefaultLayout from '@/components/layouts';
import NavBar from '@/components/nav-bar';

import s from './style.module.scss';

export default function Search() {
  const router = useRouter();
  const { title, categoryId } = router.query;

  const { data } = useGetFeed();

  // * 근데 문제가 있음.. 이거 카테고리 Id로 검색하면 헤더는 어떤 값으로 띄운담..?

  if (!data) {
    return <div />;
  }

  return (
    <>
      <Header title={`${(title as string) ?? ''} 검색결과 ${data.pages[0].pageable.pageSize}건`} />
      <section className={s.searchWrapper}>
        {data.pages.map((content) => (
          <FeedGrid key={content.pageable.pageNumber} data={content.content} />
        ))}
        <NavBar />
      </section>
    </>
  );
}

Search.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
