import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { signinSchema } from '@/utils/validate';

import AuthHeader from '@/components/auth-header/auth-header';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import AuthLayout from '@/components/layouts/auth-layout/auth-layout';

import s from '../signup/style.module.scss';

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
    <main className={s.signUpContainer}>
      <AuthHeader />
      <h1>
        아워저니와 함께 <br />
        신나는 여정을 시작해볼까요?
      </h1>
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
    </main>
  );
}

Signin.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
