import type { Profile } from '@/types/profile';

import { checkValidImgUrl } from '@/utils/check-valid-image-url';

import Skeleton from '../skeleton';

import s from './style.module.scss';

import { DefaultProfile } from '@/assets/icons';

interface UserInfoProps {
  isPending: boolean;
  profile?: Profile;
}

export default function UserInfo({ isPending, profile }: UserInfoProps) {
  if (isPending) {
    return (
      <div className={s.profileWrapper}>
        <Skeleton />
      </div>
    );
  }

  return (
    <div className={s.profileWrapper}>
      {profile?.imageUrl && checkValidImgUrl(profile?.imageUrl) ? <img src={profile?.imageUrl} alt="profile img" /> : <DefaultProfile />}
      <div className={s.userInfoWrapper}>
        <div>{profile?.nickname}</div>
        <p>{profile?.selfIntroduction ?? '한 줄 소개가 없습니다'}</p>
      </div>
    </div>
  );
}
