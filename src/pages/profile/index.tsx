import { type ReactNode, useState } from 'react';
import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/router';

import useGetMyContents from '@/hooks/profile/use-get-my-contents';
import useGetProfile from '@/hooks/profile/use-get-profile';

import ProfileLayout from '@/components/layouts/profile-layout';
import MenuBar from '@/components/menu-bar';

import ContentItem from './(components)/content';
import NavItem from './(components)/nav-item';
import ProfileHeader from './(components)/profile-header';
import UserSettings from './(components)/user-settings';

import s from './style.module.scss';

import { ArrowDownIcon, ArrowUpIcon, ArticleIcon, DefaultProfile, ForwardIcon, GroupProfileIcon, PersonIcon } from '@/assets/icons';

export default function Profile() {
  const router = useRouter();
  const [openContents, setOpenContents] = useState<boolean>(false);
  const { data, isPending } = useGetMyContents({ id: 1, open: openContents });
  const { data: profile } = useGetProfile(1); // 나중에 api 본인 아이디는 안들어가게 수정된다고함

  let contents;

  if (openContents && isPending) {
    contents = <div>로딩중?</div>;
  }

  if (openContents && data) {
    contents = (
      <div className={s.contentsWrapper}>
        {data.map((page) => (
          <>
            {page.content.map((e) => (
              <ContentItem key={e.contentId} content={e} />
            ))}
          </>
        ))}
      </div>
    );
  }

  return (
    <div className={s.profileContainer}>
      <ProfileHeader text="프로필 수정" />
      <main>
        <div className={s.profileWrapper}>
          <DefaultProfile />
          <div className={s.userInfoWrapper}>
            <div>{profile?.nickname}</div>
            <p>{profile?.selfIntroduction}</p>
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
          <NavItem leftIcon={<GroupProfileIcon />} text="팔로워 수" rightIcon={<p>{profile?.followerNum}명</p>} />
          <NavItem leftIcon={<GroupProfileIcon />} text="팔로잉" rightIcon={<p>{profile?.followingNum}명</p>} />
        </nav>
      </main>
      <UserSettings />
    </div>
  );
}

Profile.getLayout = (page: ReactNode) => (
  <ProfileLayout>
    {page}
    <MenuBar pk={1} />
  </ProfileLayout>
);
