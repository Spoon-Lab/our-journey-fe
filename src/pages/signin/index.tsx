import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';

import { router } from '@/constants/router';

import { signinSchema } from '@/utils/validate';

import AuthHeader from '@/components/auth-header/auth-header';
import AuthIntroText from '@/components/auth-Intro-text/auth-Intro-text';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import AuthLayout from '@/components/layouts/auth-layout/auth-layout';

import s from './style.module.scss';

interface SigninData {
  email: string;
  password: string;
}

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SigninData>({
    resolver: yupResolver(signinSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = () => {
    reset();
  };

  return (
    <main className={s.signInContainer}>
      <AuthHeader />
      <AuthIntroText text={`아워저니와 함께\n신나는 여정을 시작해볼까요?`} />
      <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="이메일 주소를 입력해주세요"
          id="email"
          {...register('email')}
          type="text"
          errorMessage={errors.email?.message}
          labelText="이메일 입력"
          autoComplete="email"
        />
        <Input
          placeholder="비밀번호를 입력해주세요"
          type="password"
          id="password"
          {...register('password')}
          errorMessage={errors.password?.message}
          labelText="비밀번호 입력"
          autoComplete="new-password"
        />

        <Button type="submit">로그인</Button>
      </form>
      <div className={s.searchWrapper}>
        <Link href={router.searchPassword}>비밀번호 찾기</Link>
        <span />
        <Link href={router.signup}>회원가입 하기</Link>
      </div>
    </main>
  );
}

Signin.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
