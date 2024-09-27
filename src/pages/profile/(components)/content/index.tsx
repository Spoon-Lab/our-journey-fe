import { useRouter } from 'next/router';

import type { MyContent } from '@/types/contents';
import { ROUTES } from '@/constants/router';

import s from './style.module.scss';

export default function ContentItem({ content }: { content: MyContent }) {
  const router = useRouter();

  const handleClick = () => {
    void router.push(ROUTES.content.detail(content.contentId));
  };

  return (
    <div className={s.container} onClick={handleClick}>
      <img src={content?.contentImageUrl} alt="content img" />
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
