import React, { useRef } from 'react';

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
  const { data: contentData, isLoading: isLoadingContent, isFetching: isContentFetching } = useGetOneContent(contentId);
  const {
    data: threads,
    isLoading: isThreadLoading,
    isSuccess: successFetchingThread,
    error: errThreadFetching,
    fetchNextPage,
    hasNextPage,
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
        <ContentHeader contentId={contentId} isWriter={contentData?.isEditable ?? false} />
      </ProgressBarHeader>
      {/* TODO: Add logic for handling loading state and empty content data */}
      <ContentCover content={contentData} user={contentData?.contentProfileDto} isLoading={isLoadingContent || isContentFetching} />
      <div className={s.wrapBody}>
        <ContentSection
          contentId={contentId}
          initialLiked={contentData?.isLiked || false}
          comments={contentData?.commentCount || 0}
          likes={contentData?.likeCount || 0}
          tags={Array.isArray(contentData?.tags) ? contentData.tags : []}
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
          {contentData?.isEditable && <AddThreadBtn contentId={contentId} />}
        </div>
      </div>
    </div>
  );
}
