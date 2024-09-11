import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { emailCheckSchema } from '@/utils/validate';

import AuthHeader from '@/components/auth-header/auth-header';
import AuthIntroText from '@/components/auth-Intro-text/auth-Intro-text';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import AuthLayout from '@/components/layouts/auth-layout/auth-layout';

import s from './style.module.scss';

export default function SearchPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ email: string }>({
    resolver: yupResolver(emailCheckSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = () => {
    reset();
  };

  return (
    <div className={s.searchContainer}>
      <AuthHeader text="비밀번호 재설정" />
      <AuthIntroText text={'가입 시 등록한 \n이메일 주소를 입력해주세요'} subText="비밀번호 재설정 링크를 보내드립니다" />
      <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          labelText="이메일 입력"
          placeholder="이메일 주소를 입력해주세요"
          {...register('email')}
          errorMessage={errors.email?.message}
          autoComplete="email"
        />
        <Button type="submit">재설정 링크 받기</Button>
      </form>
    </div>
  );
}
SearchPassword.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
