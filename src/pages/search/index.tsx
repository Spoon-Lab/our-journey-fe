import { type ReactNode, useRef } from 'react';
import { useRouter } from 'next/router';

import useGetContents from '@/hooks/contents/use-get-contents';
import { useIntersectionObserver } from '@/hooks/contents/use-intersection-observer';

import FeedGrid from '@/components/feed-grid';
import Header from '@/components/header';
import DefaultLayout from '@/components/layouts';
import NavBar from '@/components/nav-bar';

import s from './style.module.scss';

export default function Search() {
  const router = useRouter();
  const { title, categoryId } = router.query;

  const { data, fetchNextPage, hasNextPage } = useGetContents({ title: title as string | undefined, categoryId: categoryId as string | undefined });

  // ? CONCERN: 임시 코드. 카테고리 늘어나면 카테고리 이름들 별도로 가져올 수 있도록 store 등으로 관리할지 체크 필요.
  const categoryName = (categoryId && (categoryId === '1' ? '국내여행' : '해외여행')) ?? undefined;

  const divRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    ref: divRef,
    onIntersect: (entry) => {
      if (entry.isIntersecting && hasNextPage) {
        void fetchNextPage();
      }
    },
  });

  const isBlinkPage = data?.pages[0].list.totalElements === 0;

  return (
    <>
      <Header title={`${categoryName ?? (title as string) ?? ''} 검색결과 ${isBlinkPage ?? 0}건`} />
      <section className={s.searchWrapper}>
        {isBlinkPage ? (
          <div className={s.noSearchBox}>
            <span className={s.noSearchList}>검색 결과가 없습니다.</span>
          </div>
        ) : (
          data?.pages.map((content) => <FeedGrid key={content.list.pageable.pageNumber} data={content.list.content} />)
        )}
        <div className={s.refArea} ref={divRef} />
      </section>
      <NavBar />
    </>
  );
}

Search.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
