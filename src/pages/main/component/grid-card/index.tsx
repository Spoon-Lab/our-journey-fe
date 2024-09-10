// import type { InterfaceFeed } from '@/types';

import type { Contents } from '@/types/contents';

import s from './style.module.scss';

export default function GridCard({ data }: { data: Contents }) {
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}.${month}.${day}`;
  }

  if (!data) {
    return <div />;
  }

  return (
    <figure className={s.cardWrapper}>
      <div className={s.thumbnailBox}>
        <img alt={data.title} src={data.postImg} className={s.thumbnail} />
        <span className={s.date}>{formatDate(new Date(data.createdAt))}</span>
      </div>
      <h3 className={s.cardTitle}>{data.title}</h3>
      <div className={s.profileBox}>
        <img className={s.profileThumbnail} src={data.profile.profileImg} alt={`${data.profile.nickname} 님의 사진`} />
        <span className={s.profileName}>{data.profile.nickname}</span>
      </div>
    </figure>
  );
}
