import type { ReactNode } from 'react';
import Link from 'next/link';

import { ROUTES } from '@/constants/router';

import DefaultLayout from '@/components/layouts';

import s from './style.module.scss';

export default function NotFound() {
  return (
    <section className={s.notFoundWrapper}>
      <div className={s.notFoundTextBox}>
        <h2 className={s.notFoundTitle}>404</h2>
        <p className={s.notFoundDescription}>{`존재하지 않는 주소를 입력하셨거나\n요청하신 페이지의 주소가 변경\n삭제되어 찾을 수 없습니다.`}</p>
      </div>
      <Link href={ROUTES.main} className={s.moveLinkHome}>
        <span>홈으로 가기</span>
      </Link>
    </section>
  );
}

NotFound.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
