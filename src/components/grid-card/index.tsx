import type { Content } from '@/types/contents';

import { formatDate } from '@/libs/date';

import s from './style.module.scss';

export default function GridCard({ data }: { data: Content }) {
  if (!data) {
    return <div />;
  }

  const title = data.title.length > 18 ? `${data.title.substring(0, 15)}...` : data.title;

  return (
    <button type="button" className={s.cardWrapper}>
      <figure className={s.thumbnailBox}>
        <img alt={data.title} src={data.postImg} className={s.thumbnail} />
        <span className={s.date}>{formatDate(new Date(data.createdAt))}</span>
      </figure>
      <h3 className={s.cardTitle}>{title}</h3>
      <div className={s.profileBox}>
        <img className={s.profileThumbnail} src={data.contentProfileDto.profileImgUrl} alt={`${data.contentProfileDto.name} 님의 사진`} />
        <span className={s.profileName}>{data.contentProfileDto.name}</span>
      </div>
    </button>
  );
}
