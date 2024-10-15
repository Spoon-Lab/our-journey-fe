import React, { useCallback, useRef } from 'react';

import useGetOneContent from '@/hooks/contents/api/use-get-one-content';
import { useGetRouteParamNumber } from '@/hooks/contents/core/use-get-route-param-number';
import { useIntersectionObserver } from '@/hooks/contents/use-intersection-observer';
import useGetThreads from '@/hooks/threads/use-get-threads';
import useScroll from '@/hooks/use-scroll';

import AddThreadBtn from './(components)/add-thread-btn';
import ContentCover from './(components)/content-cover';
import ContentHeader from './(components)/content-header';
import ContentSection from './(components)/contents-section';
import ProgressBarHeader from './(components)/progress-bar-header';
import ThreadFrame from './(components)/thread-frame';

import s from './style.module.scss';

export default function DetailPage() {
  const { isScrolled, scrollPercent } = useScroll(30);

  const contentId = useGetRouteParamNumber('contentId');
  const { data: fetchedContent, isLoading: isLoadingContent, isSuccess: successFetchingContent, error: errContentFetching } = useGetOneContent(contentId);
  const {
    data: threads,
    isLoading: isThreadFetching,
    isSuccess: successFetchingThread,
    error: errThreadFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetThreads(contentId);

  const divRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    ref: divRef,
    onIntersect: (entry) => {
      if (entry.isIntersecting && hasNextPage) {
        void fetchNextPage();
      }
    },
  });

  return (
    <div className={s.detailPage}>
      <ProgressBarHeader isScrolled={isScrolled} scrollPercent={scrollPercent}>
        <ContentHeader contentId={contentId} isWriter={fetchedContent?.isEditable ?? false} />
      </ProgressBarHeader>
      {/* TODO: Add logic for handling loading state and empty content data */}
      {successFetchingContent && fetchedContent && <ContentCover content={fetchedContent} user={fetchedContent.contentProfileDto} />}
      <div className={s.wrapBody}>
        <ContentSection
          contentId={contentId}
          initialLiked={fetchedContent?.isLiked || false}
          comments={fetchedContent?.commentCount || 0}
          likes={fetchedContent?.likeCount || 0}
          tags={Array.isArray(fetchedContent?.tags) ? fetchedContent.tags : []}
        />
        <div className={s.divider} />
        <div className={s.wrapThreads}>
          {successFetchingThread &&
            threads?.pages.map((wrappedThread, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {wrappedThread.list.content.map((thread) => (
                  <ThreadFrame
                    key={thread.threadId}
                    threadContent={thread.texts}
                    writerName={thread.profileThreadDto.nickName}
                    writerIcon={thread.profileThreadDto.imgUrl}
                    tags={thread.tagNames}
                    image={thread.threadImg}
                    isWriter={thread.isEditable}
                    threadId={thread.threadId}
                    contentId={contentId}
                    date={thread.createdAt}
                    profileId={thread.profileThreadDto.profileId}
                  />
                ))}
              </React.Fragment>
            ))}
          <div className={s.refArea} ref={divRef} />
          {fetchedContent?.isEditable && <AddThreadBtn contentId={contentId} />}
        </div>
      </div>
    </div>
  );
}
