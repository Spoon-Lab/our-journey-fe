import Image from 'next/image';

import type { Content } from '@/types/contents';

import s from './style.module.scss';
// TODO:spring에서 주는 데이터에 작성글 내용이 없어서 변경해야할것같음

export default function ContentItem({ content }: { content: Content }) {
  return (
    <div className={s.container}>
      <Image src={content?.postImg} alt="content img" width={66} height={66} />
      <div className={s.contentWrapper}>
        <h1>{content?.title}</h1>
        <div className={s.contentBox}>
          <p className={s.content}>작성글 내용</p>
          <p className={s.nickname}>{content?.nickname}</p>
        </div>
      </div>
    </div>
  );
}
