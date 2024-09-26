import type { MyContent } from '@/types/contents';

import s from './style.module.scss';

export default function ContentItem({ content }: { content: MyContent }) {
  // TODO: 임시데이터 이미지가 string 이라 오류가 떠서 잠시 주석처리 -> 이후 수정
  return (
    <div className={s.container}>
      {/* <Image src={content?.contentImageUrl} alt="content img" width={66} height={66} /> */}
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
