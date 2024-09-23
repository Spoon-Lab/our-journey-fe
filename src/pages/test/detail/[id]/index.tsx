import type { ReactNode } from 'react';

import useScroll from '@/hooks/use-scroll';

import DefaultLayout from '@/components/layouts';

import ContentsFrame from './(components)/contents-frame';
import ContentsInfo from './(components)/contents-info';
import CoverHeader from './(components)/cover-header';
import ParallaxCoverImage from './(components)/parallax-cover';
import ThreadFrame from './(components)/thread-frame';

import s from './style.module.scss';

import contentsMockData from '@/mocks/contents';

export default function DetailPage() {
  const { isScrolled, scrollPercent } = useScroll(370);
  console.log(process.env.NEXT_PUBLIC_BASE_URL);

  return (
    <div className={s.wrapDetail}>
      <div className={s.wrapCover}>
        <div className={s.coverItem}>
          <ParallaxCoverImage src={contentsMockData.bgImage} alt="cover-image" />
          <div className={s.wrapContents}>
            <ContentsInfo title={contentsMockData.title} writer={contentsMockData.writer} date={contentsMockData.date} />
          </div>
        </div>
      </div>
      <CoverHeader isScrolled={isScrolled} scrollPercent={scrollPercent} />
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

// DetailPage.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
