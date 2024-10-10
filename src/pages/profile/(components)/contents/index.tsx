import React, { useRef } from 'react';
import type { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import type { MyContents, MyLikeContents } from '@/types/contents';
import { ROUTES } from '@/constants/router';

import { useIntersectionObserver } from '@/hooks/contents/use-intersection-observer';

import ContentItem from '../content';
import ContentSkeleton from '../content-skeleton';

import s from './style.module.scss';

interface ContentsProps {
  data?: MyContents[] | MyLikeContents[];
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<MyLikeContents[] | MyContents[]>>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isPending: boolean;
  type: 'like' | 'content';
}

export default function Contents({ data, isPending, hasNextPage, fetchNextPage, type, isFetchingNextPage }: ContentsProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useIntersectionObserver({
    ref: divRef,
    onIntersect: (entry) => {
      if (entry.isIntersecting && hasNextPage) {
        void fetchNextPage();
      }
    },
  });

  if (isPending && !data) {
    return (
      <div className={s.skeletonWrapper}>
        {new Array(2).fill('').map((_, idx) => (
          <ContentSkeleton key={idx} />
        ))}
      </div>
    );
  }

  let noContents;

  if (type === 'like') {
    noContents = <p>좋아요한 글이 없습니다</p>;
  } else {
    noContents = (
      <>
        <p>작성한 글이 없습니다</p>
        <button type="button" onClick={() => router.push(ROUTES.content.create())}>
          글쓰러 가기
        </button>
      </>
    );
  }

  if (data) {
    return (
      <div className={s.contentsWrapper}>
        {data.map((page, idx) =>
          page.list.content.length === 0 ? (
            <div key={idx} className={s.noContentWrapper}>
              {noContents}
            </div>
          ) : (
            <React.Fragment key={idx}>
              {page.list.content.map((e) => (
                <ContentItem key={e.contentId} content={e} />
              ))}
            </React.Fragment>
          ),
        )}
        {hasNextPage && isFetchingNextPage && (
          <div className={s.skeletonWrapper}>
            {new Array(2).fill('').map((_, idx) => (
              <ContentSkeleton key={idx} />
            ))}
          </div>
        )}
        <div ref={divRef} />
      </div>
    );
  }
}
