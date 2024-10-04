import { motion } from 'framer-motion';
import Link from 'next/link';

import type { Content } from '@/types/contents';
import { ROUTES } from '@/constants/router';

import { formatDate } from '@/libs/date';
import { randomDefaultImage } from '@/utils/random-default-image';

import s from './style.module.scss';

export default function GridCard({ data }: { data: Content }) {
  if (!data) {
    return <div />;
  }

  const postImage = data.postImg ? data.postImg : randomDefaultImage(2);
  const profileImage = data.contentProfileDto.profileImgUrl

  return (
    <Link className={s.cardWrapper} href={ROUTES.content.detail(data.contentId)}>
      <figure className={s.thumbnailBox}>
        <div className={s.thumbnailWrap}>
          <div className={s.imageGradient} />
          <motion.img alt={data.title} src={postImage} className={s.thumbnail} loading="lazy" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} />
          <span className={s.date}>{formatDate(new Date(data.createdAt))}</span>
        </div>
      </figure>
      <h3 className={s.cardTitle}>{data.title}</h3>
      <div className={s.profileBox}>
        {data.contentProfileDto.profileImgUrl ?
          <img className={s.profileThumbnail} src={data.contentProfileDto.profileImgUrl} alt={`${data.contentProfileDto.name} 님의 사진`} loading="lazy" /> : 
          <DefaultProfile />
        }
        <span className={s.profileName}>{data.contentProfileDto.name}</span>
      </div>
    </Link>
  );
}
