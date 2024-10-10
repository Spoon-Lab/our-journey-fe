import { useRouter } from 'next/router';

import type { MyContent, MyLikeContent } from '@/types/contents';
import { ROUTES } from '@/constants/router';

import { checkValidImgUrl } from '@/utils/check-valid-image-url';

import s from './style.module.scss';

export default function ContentItem({ content }: { content: MyContent | MyLikeContent }) {
  const router = useRouter();

  const imageUrl = content && ('contentImageUrl' in content ? content.contentImageUrl : content?.postImageUrl);

  const handleClick = () => {
    void router.push(ROUTES.content.detail(content.contentId));
  };

  return (
    <div className={s.container} onClick={handleClick}>
      {imageUrl && checkValidImgUrl(imageUrl) ? <img src={imageUrl} alt="content img" loading="lazy" /> : <div className={s.defaultImg} />}
      <div className={s.contentWrapper}>
        <h1>{content?.title}</h1>
        <p className={s.date}>{content?.createdAt.split(' ')[0]}</p>
      </div>
    </div>
  );
}
