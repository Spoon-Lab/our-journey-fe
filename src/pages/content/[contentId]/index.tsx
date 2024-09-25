import useGetOneContent from '@/hooks/content/use-get-one-content';
import { useGetRouteParamNumber } from '@/hooks/use-get-route-param-number';
import useScroll from '@/hooks/use-scroll';

import ContentCover from './(components)/content-cover';
import ContentHeader from './(components)/content-header';
import ContentsFrame from './(components)/contents-frame';
import ProgressBarHeader from './(components)/progress-bar-header';
import ThreadFrame from './(components)/thread-frame';

import s from './style.module.scss';

import { contentsMockData } from '@/mocks/contents';

export default function DetailPage() {
  const { isScrolled, scrollPercent } = useScroll(370);

  const contentId = useGetRouteParamNumber('contentId');
  const { data: fetchedContent, isLoading: isFetching, isSuccess: successFetchingContent, error: errContentFetching } = useGetOneContent(contentId);

  return (
    <div className={s.detailPage}>
      <ProgressBarHeader isScrolled={isScrolled} scrollPercent={scrollPercent}>
        <ContentHeader contentId={contentId} />
      </ProgressBarHeader>
      {/* TODO: Add logic for handling loading state and empty content data */}
      {successFetchingContent && fetchedContent && <ContentCover content={fetchedContent} />}
      <div className={s.wrapBody}>
        <ContentsFrame
          initialLiked={false}
          comments={contentsMockData.contents.comments}
          likes={contentsMockData.contents.likes}
          period={contentsMockData.contents.period}
          tags={contentsMockData.contents.tag}
          postContent={contentsMockData.contents.text}
        />
        <div className={s.divider} />
        <div className={s.wrapThreads}>
          {contentsMockData.threads.map((thread, idx) => (
            <ThreadFrame
              key={idx}
              threadContent={thread.text}
              writerName={thread.writer}
              date={thread.date}
              tags={thread.tag}
              image={thread.image}
              isWriter={contentsMockData.isWriter}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
