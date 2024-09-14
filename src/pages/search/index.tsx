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

  const { data } = useGetFeed({ title: title as string | undefined, categoryId: categoryId as string | undefined });

  const categoryName = (categoryId && (categoryId === 'domestic' ? '국내여행' : '해외여행')) ?? undefined;

  if (!data) {
    return <div />;
  }

  return (
    <>
      <Header title={`${categoryName ?? (title as string) ?? ''} 검색결과 ${data.pages[0].totalElements}건`} />
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
