import { useRouter } from 'next/router';

import type { Content } from '@/types/contents';
import { ROUTES } from '@/constants/router';

import { formatDate } from '@/libs/date';

import s from './style.module.scss';

export default function GridCard({ data }: { data: Content }) {
  const router = useRouter();

  const handleMoveToPage = () => router.push(`${ROUTES.content}/${data.contentId}`);
  return (
    <button id={`${data.contentId}`} type="button" className={s.cardWrapper} onClick={handleMoveToPage}>
      <figure className={s.thumbnailBox}>
        <img alt={data.title} src={data.postImg} className={s.thumbnail} />
        <span className={s.date}>{formatDate(new Date(data.createdAt))}</span>
      </figure>
      <h3 className={s.cardTitle}>{data.title}</h3>
      <div className={s.profileBox}>
        <img className={s.profileThumbnail} src={data.profileImg} alt={`${data.nickname} 님의 사진`} />
        <span className={s.profileName}>{data.nickname}</span>
      </div>
    </button>
  );
}
