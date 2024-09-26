import Image from 'next/image';

import type { Content, ProfileDto } from '@/types/threads';

import { formatTimeStamp } from '@/utils/format-date-timestamp';

import ParallaxImage from '../parallax-image';

import s from './style.module.scss';

interface ContentCoverProps {
  content: Content;
}

export default function ContentCover({ content }: ContentCoverProps) {
  const { title = '', postImg = '', createdAt = '' } = content || {};

  const writerInfoData: ProfileDto = {
    imgUrl: '',
    nickName: 'test user',
    profileId: 0,
  };

  return (
    <div className={s.contentCover}>
      <div className={s.contentContainer}>
        <div className={s.contentInfoWrapper}>
          <div className={s.memoryDateWrapper}>
            <span className={s.timeStamp}>{formatTimeStamp(createdAt)} Memory</span>
          </div>
          <div className={s.contentInfo}>
            <div className={s.contentTitle}>{title || 'No data'}</div>
            <div className={s.writerInfo}>
              <div className={s.profileImage}>{writerInfoData.imgUrl && <Image src={writerInfoData.imgUrl} alt="profile-image" width={40} height={40} />}</div>
              <span className={s.writerName}>{writerInfoData.nickName}</span>
            </div>
          </div>
        </div>
        <div className={s.imageWrapper}>
          <div className={s.imageGradient} />
          {postImg && <ParallaxImage src={postImg} alt="content-image" />}
        </div>
      </div>
    </div>
  );
}
