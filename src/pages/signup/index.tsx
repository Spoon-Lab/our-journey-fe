import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { signupSchema } from '@/utils/validate';

import AuthHeader from '@/components/auth-header/auth-header';
import AuthIntroText from '@/components/auth-Intro-text/auth-Intro-text';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import AuthLayout from '@/components/layouts/auth-layout/auth-layout';

import s from './style.module.scss';

interface SignupData {
  email: string;
  password: string;
  passwordCheck: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupData>({
    resolver: yupResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      passwordCheck: '',
    },
  });
  const onSubmit = () => {
    reset();
  };
  return (
    <main className={s.signUpContainer}>
      <AuthHeader />
      <AuthIntroText text={`이메일로 간편하게 가입하고\n아워저니를 즐겨보세요`} />

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
          placeholder="영문, 숫자 포함 00자 이상"
          type="password"
          id="password"
          {...register('password')}
          errorMessage={errors.password?.message}
          labelText="비밀번호 입력"
          autoComplete="new-password"
        />
        <Input
          placeholder="비밀번호를 재입력해주세요"
          type="password"
          id="passwordCheck"
          {...register('passwordCheck')}
          errorMessage={errors.passwordCheck?.message}
          labelText="비밀번호 재입력"
          autoComplete="new-password"
        />
        <Button type="submit">회원가입</Button>
      </form>
    </main>
  );
}

Signup.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
