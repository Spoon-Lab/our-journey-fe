import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import type { Signup } from '@/types/auth';

import { signupSchema } from '@/utils/validate';

import useSignup from '@/hooks/auth/use-signup';

import Button from '@/components/button';
import Input from '@/components/input';
import LottieLoading from '@/components/lottie-loading';

import s from './style.module.scss';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Signup>({
    resolver: yupResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password1: '',
      password2: '',
    },
  });

  const { mutate, isSuccess, isPending } = useSignup();

  const onSubmit = (data: Signup) => {
    mutate(data);
    if (isSuccess) reset();
  };

  if (isPending) {
    return <LottieLoading />;
  }

  return (
    <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.inputWrapper}>
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
          placeholder="영문, 숫자 포함 8자 이상"
          type="password"
          id="password1"
          {...register('password1')}
          errorMessage={errors.password1?.message}
          labelText="비밀번호 입력"
          autoComplete="new-password"
        />
        <Input
          placeholder="비밀번호를 재입력해주세요"
          type="password"
          id="password2"
          {...register('password2')}
          errorMessage={errors.password2?.message}
          labelText="비밀번호 재입력"
          autoComplete="new-password"
        />
      </div>
      <Button type="submit">회원가입</Button>
    </form>
  );
}
