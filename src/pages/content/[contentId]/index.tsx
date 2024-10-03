import useGetOneContent from '@/hooks/contents/use-get-one-content';
import useGetThreads from '@/hooks/threads/use-get-threads';
import { useGetRouteParamNumber } from '@/hooks/use-get-route-param-number';
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
  const { data: fetchedContent, isLoading: isFetching, isSuccess: successFetchingContent, error: errContentFetching } = useGetOneContent(contentId);
  const { data: fetchedThreadList, isLoading: isThreadFetching, isSuccess: successFetchingThread, error: errThreadFetching } = useGetThreads(contentId);

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
          period={fetchedContent?.updatedAt || ''}
          tags={Array.isArray(fetchedContent?.tags) ? fetchedContent.tags : []}
          postContent={fetchedContent?.title || ''}
        />
        <div className={s.divider} />
        <div className={s.wrapThreads}>
          {successFetchingThread &&
            fetchedThreadList &&
            fetchedThreadList.list.content.map((thread, idx) => (
              <ThreadFrame
                key={idx}
                threadContent={thread.texts}
                writerName={thread.profileThreadDto.nickName}
                writerIcon={thread.profileThreadDto.imgUrl}
                tags={thread.tagNames}
                image={thread.threadImg}
                isWriter={thread.isEditable}
                threadId={thread.threadId}
                contentId={contentId}
                date={thread.createdAt}
              />
            ))}
          <AddThreadBtn contentId={contentId} />
        </div>
      </div>
    </div>
  );
}
