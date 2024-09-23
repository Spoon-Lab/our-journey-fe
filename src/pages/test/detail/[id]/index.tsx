import type { ReactNode } from 'react';

import useScroll from '@/hooks/use-scroll';

import DefaultLayout from '@/components/layouts';

import ContentsFrame from './(components)/contents-frame';
import ContentsInfo from './(components)/contents-info';
import CoverHeader from './(components)/cover-header';
import ParallaxCoverImage from './(components)/parallax-cover';
import ThreadFrame from './(components)/thread-frame';

import s from './style.module.scss';

const mockData = {
  title: '일본 여행 1박 2일 후기',
  writer: '유저 닉네임',
  date: '2021. 10. 10',
  isWriter: true,
  bgImage: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  contents: {
    period: '2020.10.10 - 2021. 10. 11',
    text: '이번 연말에 다들 뭐하셨나요?! 저는 일본 여행 다녀왔어요! 일본에 다녀온게 무려 5년만이라 그런지 많이 바뀌었더라구요',
    tag: ['일본', '여행', '1박2일', '후기'],
    likes: 10,
    comments: 5,
  },

  threads: [
    {
      writer: '유저 닉네임',
      date: '2021. 10. 11',
      text: '이번 연말에 다들 뭐하셨나요?! 저는 일본 여행 다녀왔어요! 일본에 다녀온게 무려 5년만이라 그런지 많이 바뀌었더라구요',
      tag: ['일본', '여행', '1박2일', '후기'],
      image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      writer: '유저 닉네임',
      date: '2021. 10. 11',
      text: '이번 연말에 다들 뭐하셨나요?! 저는 일본 여행 다녀왔어요! 일본에 다녀온게 무려 5년만이라 그런지 많이 바뀌었더라구요',
      tag: ['일본', '여행', '1박2일', '후기'],
    },
    {
      writer: '유저 닉네임',
      date: '2021. 10. 11',
      text: '이번 연말에 다들 뭐하셨나요?! 저는 일본 여행 다녀왔어요! 일본에 다녀온게 무려 5년만이라 그런지 많이 바뀌었더라구요',
      tag: ['일본', '여행', '1박2일', '후기'],
      image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      writer: '유저 닉네임',
      date: '2021. 10. 11',
      text: '이번 연말에 다들 뭐하셨나요?! 저는 일본 여행 다녀왔어요! 일본에 다녀온게 무려 5년만이라 그런지 많이 바뀌었더라구요',
      tag: ['일본', '여행', '1박2일', '후기'],
    },

    {
      writer: '유저 닉네임',
      date: '2021. 10. 11',
      text: '이번 연말에 다들 뭐하셨나요?! 저는 일본 여행 다녀왔어요! 일본에 다녀온게 무려 5년만이라 그런지 많이 바뀌었더라구요',
      tag: ['일본', '여행', '1박2일', '후기'],
      image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      writer: '유저 닉네임',
      date: '2021. 10. 11',
      text: '이번 연말에 다들 뭐하셨나요?! 저는 일본 여행 다녀왔어요! 일본에 다녀온게 무려 5년만이라 그런지 많이 바뀌었더라구요',
      tag: ['일본', '여행', '1박2일', '후기'],
    },
    {
      writer: '유저 닉네임',
      date: '2021. 10. 11',
      text: '이번 연말에 다들 뭐하셨나요?! 저는 일본 여행 다녀왔어요! 일본에 다녀온게 무려 5년만이라 그런지 많이 바뀌었더라구요',
      tag: ['일본', '여행', '1박2일', '후기'],
      image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      writer: '유저 닉네임',
      date: '2021. 10. 11',
      text: '이번 연말에 다들 뭐하셨나요?! 저는 일본 여행 다녀왔어요! 일본에 다녀온게 무려 5년만이라 그런지 많이 바뀌었더라구요',
      tag: ['일본', '여행', '1박2일', '후기'],
    },
  ],
};

export default function DetailPage() {
  const { isScrolled, scrollPercent } = useScroll(370);

  return (
    <div className={s.wrapDetail}>
      <div className={s.wrapCover}>
        <div className={s.coverItem}>
          <ParallaxCoverImage src={mockData.bgImage} alt="cover-image" />
          <div className={s.wrapContents}>
            <ContentsInfo title={mockData.title} writer={mockData.writer} date={mockData.date} />
          </div>
        </div>
      </div>
      <CoverHeader isScrolled={isScrolled} scrollPercent={scrollPercent} />
      <div className={s.wrapBody}>
        <ContentsFrame
          initialLiked={false}
          comments={mockData.contents.comments}
          likes={mockData.contents.likes}
          period={mockData.contents.period}
          tags={mockData.contents.tag}
          postContent={mockData.contents.text}
        />
        <div className={s.divider} />
        <div className={s.wrapThreads}>
          {mockData.threads.map((thread, idx) => (
            <ThreadFrame
              key={idx}
              threadContent={thread.text}
              writerName={thread.writer}
              date={thread.date}
              tags={thread.tag}
              image={thread.image}
              isWriter={mockData.isWriter}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// DetailPage.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
