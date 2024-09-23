import Link from 'next/link';

import type { Content } from '@/types/contents';
import { ROUTES } from '@/constants/router';

import { formatDate } from '@/libs/date';

import s from './style.module.scss';

export default function GridCard({ data }: { data: Content }) {
  if (!data) {
    return <div />;
  }

  const postImage =
    data.postImg != null ? data.postImg : `${process.env.NEXT_PUBLIC_API_BASE_URL}/image-grid-card-default${Math.floor(Math.random() * 2) + 1}.webp`;

  return (
    <Link className={s.cardWrapper} href={`${ROUTES.detail}?id=${data.contentId}`}>
      <figure className={s.thumbnailBox}>
        <img alt={data.title} src={postImage} className={s.thumbnail} loading="lazy" />
        <span className={s.date}>{formatDate(new Date(data.createdAt))}</span>
      </figure>
      <h3 className={s.cardTitle}>{data.title}</h3>
      <div className={s.profileBox}>
        <img className={s.profileThumbnail} src={data.contentProfileDto.profileImgUrl} alt={`${data.contentProfileDto.name} 님의 사진`} loading="lazy" />
        <span className={s.profileName}>{data.contentProfileDto.name}</span>
      </div>
    </Link>
  );
}
