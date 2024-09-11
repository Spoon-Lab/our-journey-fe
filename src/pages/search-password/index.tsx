import type { ReactNode } from 'react';

import AuthHeader from '@/components/auth-header/auth-header';
import AuthLayout from '@/components/layouts/auth-layout/auth-layout';

import s from './style.module.scss';

export default function SearchPassword() {
  return (
    <div className={s.searchContainer}>
      <AuthHeader text="비밀번호 재설정" />
    </div>
  );
}
SearchPassword.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
