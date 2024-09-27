import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import type { ResetPassword } from '@/types/auth';

import { newPasswordSchema } from '@/utils/validate';

import useResetPassword from '@/hooks/auth/use-reset-password';

import Button from '@/components/button';
import Input from '@/components/input';

import s from './style.module.scss';

export default function ResetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPassword>({
    resolver: yupResolver(newPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password1: '',
      password2: '',
    },
  });

  const { mutate } = useResetPassword();
  const router = useRouter();
  const { id } = router.query;

  const onSubmit = (data: ResetPassword) => {
    if (id) {
      mutate({
        uid64: id[0],
        token: id[1],
        new_password1: data.password1,
        new_password2: data.password2,
      });
      reset();
    }
  };
  return (
    <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.inputWrapper}>
        <Input
          type="password"
          labelText="새 비밀번호 입력"
          placeholder="새 비밀번호를 입력해주세요"
          {...register('password1')}
          autoComplete="password"
          id="password1"
          errorMessage={errors.password1?.message}
        />
        <Input
          type="password"
          labelText="새 비밀번호 재입력"
          placeholder="새 비밀번호를 재입력해주세요"
          {...register('password2')}
          autoComplete="password"
          id="password2"
          errorMessage={errors.password2?.message}
        />
      </div>
      <Button type="submit">비밀번호 재설정</Button>
    </form>
  );
}
