import { type ReactNode, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import type { MyContent } from '@/types/contents';
import { ROUTES } from '@/constants/router';

import { checkValidImgUrl } from '@/utils/check-valid-image-url';

import { useIntersectionObserver } from '@/hooks/contents/use-intersection-observer';
import useGetMyContents from '@/hooks/profile/use-get-my-contents';
import useGetMyProfile from '@/hooks/profile/use-get-my-profile';

import ProfileLayout from '@/components/layouts/profile-layout';
import LottieLoading from '@/components/lottie-loading';
import NavBar from '@/components/nav-bar';

import ContentItem from './(components)/content';
import NavItem from './(components)/nav-item';
import ProfileHeader from './(components)/profile-header';
import UserSettings from './(components)/user-settings';

import s from './style.module.scss';

import { ArrowDownIcon, ArrowUpIcon, ArticleIcon, DefaultProfile, ForwardIcon, PersonIcon } from '@/assets/icons';

export default function Profile() {
  const router = useRouter();
  const [openContents, setOpenContents] = useState<boolean>(false);
  const { data, isPending, fetchNextPage, hasNextPage, isError } = useGetMyContents({ open: openContents });
  const { data: profile } = useGetMyProfile();
  const divRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    ref: divRef,
    onIntersect: (entry) => {
      if (entry.isIntersecting && hasNextPage) {
        void fetchNextPage();
      }
    },
  });

  let contents;

  useEffect(() => {
    if (isError) {
      setOpenContents((prev) => !prev);
    }
  }, [isError]);

  if (openContents && isPending) {
    contents = (
      <div className={s.loadingWrapper}>
        <LottieLoading />
      </div>
    );
  }

  if (openContents && data) {
    contents = (
      <div className={s.contentsWrapper}>
        {data.map((page, idx) =>
          page.list.content.length === 0 ? (
            <div key={idx} className={s.noContentWrapper}>
              <p>작성한 글이 없습니다</p>
              <button type="button" onClick={() => router.push(ROUTES.content.create())}>
                글쓰러 가기
              </button>
            </div>
          ) : (
            <div key={idx}>
              {page.list.content.map((e: MyContent) => (
                <ContentItem key={e.contentId} content={e} />
              ))}
            </div>
          ),
        )}
        <div ref={divRef} />
      </div>
    );
  }

  return (
    <div className={s.profileContainer}>
      <ProfileHeader text="프로필 수정" />
      <main>
        <div className={s.profileWrapper}>
          {profile?.imageUrl && checkValidImgUrl(profile?.imageUrl) ? <img src={profile?.imageUrl} alt="profile img" /> : <DefaultProfile />}
          <div className={s.userInfoWrapper}>
            <div>{profile?.nickname}</div>
            <p>{profile?.selfIntroduction ?? '한 줄 소개가 없습니다'}</p>
          </div>
        </div>
        <nav className={s.navWrapper}>
          <NavItem leftIcon={<PersonIcon />} text="내 정보 보기" rightIcon={<ForwardIcon />} onClick={() => router.push(`${ROUTES.profileEdit}`)} />
          <NavItem
            leftIcon={<ArticleIcon />}
            text="내 작성글 모두보기"
            rightIcon={!openContents ? <ArrowDownIcon /> : <ArrowUpIcon />}
            onClick={() => setOpenContents((prev) => !prev)}
          />
          {contents}
          {/* <NavItem leftIcon={<GroupProfileIcon />} text="팔로워 수" rightIcon={<p>{profile?.followerNum}명</p>} />
          <NavItem leftIcon={<GroupProfileIcon />} text="팔로잉" rightIcon={<p>{profile?.followingNum}명</p>} /> */}
        </nav>
      </main>
      <UserSettings />
    </div>
  );
}

Profile.getLayout = (page: ReactNode) => (
  <ProfileLayout>
    {page}
    <NavBar />
  </ProfileLayout>
);
