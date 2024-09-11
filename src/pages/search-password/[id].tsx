import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import { ROUTER } from '@/constants/router';

import { newPasswordSchema } from '@/utils/validate';

import AuthHeader from '@/components/auth-header/auth-header';
import AuthIntroText from '@/components/auth-Intro-text/auth-Intro-text';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import AuthLayout from '@/components/layouts/auth-layout/auth-layout';

import s from './style.module.scss';

interface PasswordData {
  password: string;
  passwordCheck: string;
}

export default function CreatePassword() {
  const nav = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordData>({
    resolver: yupResolver(newPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      passwordCheck: '',
    },
  });

  const onSubmit = async () => {
    reset();
    await nav.push(ROUTER.signin);
  };

  return (
    <div className={s.searchContainer}>
      <AuthHeader text="비밀번호 재설정" />
      <AuthIntroText text="새 비밀번호를 입력하세요" />
      <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="password"
          labelText="새 비밀번호 입력"
          placeholder="새 비밀번호를 입력해주세요"
          {...register('password')}
          autoComplete="password"
          id="password"
          errorMessage={errors.password?.message}
        />
        <Input
          type="password"
          labelText="새 비밀번호 재입력"
          placeholder="새 비밀번호를 재입력해주세요"
          {...register('passwordCheck')}
          autoComplete="password"
          id="passwordCheck"
          errorMessage={errors.passwordCheck?.message}
        />
        <Button type="submit">비밀번호 재설정</Button>
      </form>
    </div>
  );
}

CreatePassword.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
