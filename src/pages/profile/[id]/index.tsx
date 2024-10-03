import { type ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/router';

import { checkValidImgUrl } from '@/utils/check-valid-image-url';

import useGetOtherProfile from '@/hooks/profile/use-get-other-profile';

import ProfileLayout from '@/components/layouts/profile-layout';
import LottieLoading from '@/components/lottie-loading';
import NavBar from '@/components/nav-bar';

import NavItem from '../(components)/nav-item';
import ProfileHeader from '../(components)/profile-header';

import s from '../style.module.scss';

import { DefaultProfile, GroupProfileIcon } from '@/assets/icons';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const { data: profile } = useGetOtherProfile(Number(id));

  const [isLoading, setIsLoading] = useState(true);

  // 내 프로필일 경우
  useEffect(() => {
    if (profile?.editable) {
      void router.push(ROUTES.profile);
    } else {
      setIsLoading(false);
    }
  }, [profile, router]);

  if (isLoading) {
    return (
      <div className={s.profileContainer}>
        <LottieLoading />
      </div>
    );
  }

  return (
    <div className={s.profileContainer}>
      <ProfileHeader text="프로필" iconClick={() => router.back()} />
      <main>
        <div className={s.profileWrapper}>
          {profile?.imageUrl && checkValidImgUrl(profile?.imageUrl) ? <img src={profile?.imageUrl} alt="profile img" /> : <DefaultProfile />}
          <div className={s.userInfoWrapper}>
            <div>{profile?.nickname}</div>
            <p>{profile?.selfIntroduction ?? '한 줄 소개가 없습니다'}</p>
          </div>
        </div>
        <nav className={s.navWrapper}>
          <NavItem leftIcon={<GroupProfileIcon />} text="팔로워 수" rightIcon={<p>{profile?.followerNum} 명</p>} />
          <NavItem leftIcon={<GroupProfileIcon />} text="팔로잉" rightIcon={<p>{profile?.followingNum} 명</p>} />
        </nav>
      </main>
    </div>
  );
}

Profile.getLayout = (page: ReactNode) => (
  <ProfileLayout>
    {page}
    <NavBar />
  </ProfileLayout>
);
