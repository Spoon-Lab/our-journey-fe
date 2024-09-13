import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import { ROUTER } from '@/constants/router';

import { emailCheckSchema } from '@/utils/validate';

import AuthHeader from '@/components/auth-header/auth-header';
import AuthIntroText from '@/components/auth-Intro-text/auth-Intro-text';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import AuthLayout from '@/components/layouts/auth-layout/auth-layout';

import EmailForm from './components/email-form';

import s from './style.module.scss';

export default function ResetPassword() {
  return (
    <main className={s.searchContainer}>
      <AuthIntroText text={'가입 시 등록한 \n이메일 주소를 입력해주세요'} subText="비밀번호 재설정 링크를 보내드립니다" />
      <EmailForm />
    </main>
  );
}
ResetPassword.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <AuthHeader text="비밀번호 재설정" />
    {page}
  </AuthLayout>
);
