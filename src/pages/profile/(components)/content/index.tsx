import Image from 'next/image';

import type { MyContent } from '@/types/contents';

import s from './style.module.scss';

export default function ContentItem({ content }: { content: MyContent }) {
  return (
    <div className={s.container}>
      <Image src={content?.contentImageUrl} alt="content img" width={66} height={66} />
      <div className={s.contentWrapper}>
        <h1>{content?.title}</h1>
        <div className={s.contentBox}>
          <p className={s.content}>작성글 내용</p>
          <p className={s.date}>{content?.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
