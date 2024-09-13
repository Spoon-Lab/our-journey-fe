import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import type { Login } from '@/types/auth';

import { loginSchema } from '@/utils/validate';

import useLogin from '@/hooks/auth/use-login';

import Button from '@/components/button/button';
import Input from '@/components/input/input';

import s from './style.module.scss';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Login>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate } = useLogin();

  const onSubmit = (data: Login) => {
    mutate(data);
    reset();
  };
  return (
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
  );
}
