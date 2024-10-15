import Image from 'next/image';
import { useRouter } from 'next/router';

import type { Content, ContentWriterDto } from '@/types/threads';
import { ROUTES } from '@/constants/router';

import { formatTimeStamp } from '@/utils/format-date-timestamp';
import { randomDefaultImage } from '@/utils/random-default-image';

import ParallaxImage from '../parallax-image';

import s from './style.module.scss';

import { DefaultProfile } from '@/assets/icons';

interface ContentCoverProps {
  content: Content;
  user: ContentWriterDto;
}

export default function ContentCover({ content, user }: ContentCoverProps) {
  const { title, postImg, createdAt } = content || {};
  const { profileImgUrl, name, profileId } = user || {};
  const router = useRouter();

  return (
    <div className={s.contentCover}>
      <div className={s.contentContainer}>
        <div className={s.contentInfoWrapper}>
          <div className={s.memoryDateWrapper}>
            <span className={s.timeStamp}>{formatTimeStamp(createdAt)} Memory</span>
          </div>
          <div className={s.contentInfo}>
            <div className={s.contentTitle}>{title || 'No data'}</div>
            <button className={s.writerInfo} onClick={() => router.push(ROUTES.otherProfile(profileId))} type="button" aria-label="프로필 보기">
              <div className={s.profileImage}>
                {profileImgUrl ? <Image src={profileImgUrl} alt="profile-image" width={40} height={40} /> : <DefaultProfile width={15} height={15} />}
              </div>
              <span className={s.writerName}>{name}</span>
            </button>
          </div>
        </div>
        <div className={s.imageWrapper}>
          <div className={s.imageGradient} />
          {postImg ? <ParallaxImage src={postImg} alt="content-image" /> : <ParallaxImage src={randomDefaultImage(2)} alt="content-image" />}
        </div>
      </div>
    </div>
  );
}
