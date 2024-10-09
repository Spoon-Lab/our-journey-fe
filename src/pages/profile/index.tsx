import { type ReactNode, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import type { MyContent, MyLikeContent } from '@/types/contents';
import { ROUTES } from '@/constants/router';

import { checkValidImgUrl } from '@/utils/check-valid-image-url';
import { setSentryLogging } from '@/utils/error-logging';

import { useIntersectionObserver } from '@/hooks/contents/use-intersection-observer';
import useGetMyContents from '@/hooks/profile/use-get-my-contents';
import useGetMyLikes from '@/hooks/profile/use-get-my-likes';
import useGetMyProfile from '@/hooks/profile/use-get-my-profile';

import ProfileLayout from '@/components/layouts/profile-layout';
import LottieLoading from '@/components/lottie-loading';
import NavBar from '@/components/nav-bar';

import ContentItem from './(components)/content';
import NavItem from './(components)/nav-item';
import ProfileHeader from './(components)/profile-header';
import Skeleton from './(components)/skeleton';
import UserSettings from './(components)/user-settings';

import s from './style.module.scss';

import { ArrowDownIcon, ArrowUpIcon, ArticleIcon, DefaultProfile, ForwardIcon, PersonIcon } from '@/assets/icons';

export default function MyProfile() {
  const router = useRouter();
  const [openContents, setOpenContents] = useState<boolean>(false);
  const [openLikes, setOpenLikes] = useState<boolean>(false);

  const { data, isPending, fetchNextPage, hasNextPage, isError, error } = useGetMyContents({ open: openContents });
  const { data: profile, isError: isGetProfileError, error: getProfileError, isPending: profilePending } = useGetMyProfile();
  const divRef = useRef<HTMLDivElement>(null);
  const likeRef = useRef<HTMLDivElement>(null);
  const { data: likesData, isPending: likePending, fetchNextPage: likeFetchNextPage, hasNextPage: likeHasNextPage } = useGetMyLikes(openLikes);

  console.log(likesData);

  useIntersectionObserver({
    ref: divRef,
    onIntersect: (entry) => {
      if (entry.isIntersecting && hasNextPage) {
        void fetchNextPage();
      }
    },
  });

  useIntersectionObserver({
    ref: likeRef,
    onIntersect: (entry) => {
      if (entry.isIntersecting && likeHasNextPage) {
        void likeFetchNextPage();
      }
    },
  });

  useEffect(() => {
    if (isError) {
      setSentryLogging(error);
      setOpenContents((prev) => !prev);
    }

    if (isGetProfileError) {
      setSentryLogging(getProfileError);
    }
  }, [isError, isGetProfileError, error, getProfileError]);

  let contents;

  if (openContents && isPending) {
    contents = (
      <div className={s.loadingWrapper}>
        <LottieLoading />
      </div>
    );
  }

  if (openContents && data) {
    contents = (
      <>
        {data.map((page, idx) =>
          page.list.content.length === 0 ? (
            <div key={idx} className={s.noContentWrapper}>
              <p>작성한 글이 없습니다</p>
              <button type="button" onClick={() => router.push(ROUTES.content.create())}>
                글쓰러 가기
              </button>
            </div>
          ) : (
            <div key={idx} className={s.contentsWrapper}>
              {page.list.content.map((e: MyContent) => (
                <ContentItem key={e.contentId} content={e} />
              ))}
            </div>
          ),
        )}
        <div ref={divRef} />
      </>
    );
  }

  // 프로필
  let profileContent;

  if (profilePending) {
    profileContent = (
      <div className={s.profileWrapper}>
        <Skeleton />
      </div>
    );
  } else {
    profileContent = (
      <div className={s.profileWrapper}>
        {profile?.imageUrl && checkValidImgUrl(profile?.imageUrl) ? <img src={profile?.imageUrl} alt="profile img" /> : <DefaultProfile />}
        <div className={s.userInfoWrapper}>
          <div>{profile?.nickname}</div>
          <p>{profile?.selfIntroduction ?? '한 줄 소개가 없습니다'}</p>
        </div>
      </div>
    );
  }

  // 좋아요한 글
  let likeContents;

  if (openLikes && likePending) {
    likeContents = (
      <div className={s.loadingWrapper}>
        <LottieLoading />
      </div>
    );
  }

  if (openLikes && likesData) {
    likeContents = (
      <>
        {likesData.map((page, idx) =>
          page.list.content.length === 0 ? (
            <div key={idx} className={s.noContentWrapper}>
              <p>좋아요한 글이 없습니다</p>
            </div>
          ) : (
            <div className={s.contentsWrapper} key={idx}>
              {page.list.content.map((e: MyLikeContent) => (
                <ContentItem key={e.contentId} content={e} />
              ))}
            </div>
          ),
        )}
        <div ref={likeRef} />
      </>
    );
  }

  return (
    <div className={s.profileContainer}>
      <ProfileHeader text="프로필 수정" />
      <main>
        {profileContent}
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
          {contents}
          {/* <NavItem leftIcon={<GroupProfileIcon />} text="팔로워 수" rightIcon={<p>{profile?.followerNum}명</p>} />
          <NavItem leftIcon={<GroupProfileIcon />} text="팔로잉" rightIcon={<p>{profile?.followingNum}명</p>} /> */}
          <NavItem
            leftIcon={<ArticleIcon />}
            text="좋아요한 글 모두 보기"
            rightIcon={!openLikes ? <ArrowDownIcon /> : <ArrowUpIcon />}
            onClick={() => setOpenLikes((prev) => !prev)}
            disabled={profilePending}
          />
          {likeContents}
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
