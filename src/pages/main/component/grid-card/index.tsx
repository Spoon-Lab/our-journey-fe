import type { Content } from '@/types/contents';

import { formatDate } from '@/libs/date';

import s from './style.module.scss';

export default function GridCard({ data }: { data: Content }) {
  if (!data) {
    return <div />;
  }

  return (
    <button type="button" className={s.cardWrapper}>
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
