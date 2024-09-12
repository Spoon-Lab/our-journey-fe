import type { ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ROUTER } from '@/constants/router';

import ProfileLayout from '@/components/layouts/profile-layout/profile-layout';

import NavItem from './components/nav-item';
import ProfileHeader from './components/profile-header';

import s from './style.module.scss';

import { ArrowDownIcon, ArticleIcon, CampaignIcon, ForwardIcon, PersonIcon } from '@/assets/icons';

export default function Profile() {
  const router = useRouter();
  return (
    <div className={s.profileContainer}>
      <ProfileHeader text="프로필 수정" />
      <main>
        <div className={s.profileWrapper}>
          <Image src="/images/default_profile.png" alt="profile img" width={76} height={76} />
          <div className={s.userInfoWrapper}>
            <div>졸린 무지</div>
            <p>2342@gmail.com</p>
          </div>
        </div>
        <nav className={s.navWrapper}>
          <NavItem leftIcon={<PersonIcon />} text="내 정보 보기" rightIcon={<ForwardIcon />} onClick={() => router.push(`${ROUTER.profileEdit}/1`)} />
          <NavItem leftIcon={<ArticleIcon />} text="내 작성글 모두보기" rightIcon={<ArrowDownIcon />} />
          <NavItem leftIcon={<CampaignIcon />} text="고객센터" rightIcon={<ForwardIcon />} />
        </nav>
      </main>
    </div>
  );
}

Profile.getLayout = (page: ReactNode) => <ProfileLayout>{page}</ProfileLayout>;
