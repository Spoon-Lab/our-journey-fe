import React, { type ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/router';

import { setSentryLogging } from '@/utils/error-logging';

import useGetMyContents from '@/hooks/profile/use-get-my-contents';
import useGetMyLikes from '@/hooks/profile/use-get-my-likes';
import useGetMyProfile from '@/hooks/profile/use-get-my-profile';

import ProfileLayout from '@/components/layouts/profile-layout';
import NavBar from '@/components/nav-bar';

import Contents from './(components)/contents';
import NavItem from './(components)/nav-item';
import ProfileHeader from './(components)/profile-header';
import UserInfo from './(components)/user-info';
import UserSettings from './(components)/user-settings';

import s from './style.module.scss';

import { ArrowDownIcon, ArrowUpIcon, ArticleIcon, ForwardIcon, PersonIcon } from '@/assets/icons';

export default function MyProfile() {
  const router = useRouter();
  const [openContents, setOpenContents] = useState<boolean>(false);
  const [openLikes, setOpenLikes] = useState<boolean>(false);

  const { data, isPending, fetchNextPage, hasNextPage, isError, error } = useGetMyContents(openContents);
  const { data: profile, isError: isGetProfileError, error: getProfileError, isPending: profilePending } = useGetMyProfile();

  const { data: likesData, isPending: likePending, fetchNextPage: likeFetchNextPage, hasNextPage: likeHasNextPage } = useGetMyLikes(openLikes);

  useEffect(() => {
    if (isError) {
      setSentryLogging(error);
      setOpenContents((prev) => !prev);
    }

    if (isGetProfileError) {
      setSentryLogging(getProfileError);
    }
  }, [isError, isGetProfileError, error, getProfileError]);

  return (
    <div className={s.profileContainer}>
      <ProfileHeader text="프로필 수정" />
      <main>
        <UserInfo profile={profile} isPending={profilePending} />
        <nav className={s.navWrapper}>
          <NavItem
            leftIcon={<PersonIcon />}
            text="내 정보 보기"
            rightIcon={<ForwardIcon />}
            onClick={() => router.push(`${ROUTES.profileEdit}`)}
            disabled={profilePending}
          />
          <NavItem
            leftIcon={<ArticleIcon />}
            text="내 작성 글 모두 보기"
            rightIcon={!openContents ? <ArrowDownIcon /> : <ArrowUpIcon />}
            onClick={() => setOpenContents((prev) => !prev)}
            disabled={profilePending}
          />
          {openContents && <Contents data={data} isPending={isPending} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} type="content" />}
          <NavItem
            leftIcon={<ArticleIcon />}
            text="좋아요한 글 모두 보기"
            rightIcon={!openLikes ? <ArrowDownIcon /> : <ArrowUpIcon />}
            onClick={() => setOpenLikes((prev) => !prev)}
            disabled={profilePending}
          />
          {openLikes && <Contents data={likesData} isPending={likePending} hasNextPage={likeHasNextPage} fetchNextPage={likeFetchNextPage} type="like" />}
          {/* <NavItem leftIcon={<GroupProfileIcon />} text="팔로워 수" rightIcon={<p>{profile?.followerNum}명</p>} />
          <NavItem leftIcon={<GroupProfileIcon />} text="팔로잉" rightIcon={<p>{profile?.followingNum}명</p>} /> */}
        </nav>
      </main>
      <UserSettings />
    </div>
  );
}

MyProfile.getLayout = (page: ReactNode) => (
  <ProfileLayout>
    {page}
    <NavBar />
  </ProfileLayout>
);
