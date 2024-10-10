import React, { useRef } from 'react';
import type { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import type { MyContents, MyLikeContents } from '@/types/contents';
import { ROUTES } from '@/constants/router';

import { useIntersectionObserver } from '@/hooks/contents/use-intersection-observer';

import LottieLoading from '@/components/lottie-loading';

import ContentItem from '../content';

import s from './style.module.scss';

interface ContentsProps {
  data?: MyContents[] | MyLikeContents[];
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<MyLikeContents[] | MyContents[]>>;
  hasNextPage: boolean;
  isPending: boolean;
  type: 'like' | 'content';
}

export default function Contents({ data, isPending, hasNextPage, fetchNextPage, type }: ContentsProps) {
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

  if (isPending) {
    return (
      <div className={s.loadingWrapper}>
        <LottieLoading />
      </div>
    );
  }

  let noContents;

  if (type === 'like') {
    // TODO: 데이터에 따라 분리해야함
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
        <div ref={divRef} />
      </div>
    );
  }
}
