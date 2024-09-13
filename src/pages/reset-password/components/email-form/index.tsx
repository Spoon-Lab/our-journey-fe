import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { emailCheckSchema } from '@/utils/validate';

import useEmailRequest from '@/hooks/auth/use-email-request';

import Button from '@/components/button';
import Input from '@/components/input';

import s from './style.module.scss';

export default function EmailForm() {
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

  const { mutate } = useEmailRequest();

  const onSubmit = (data: { email: string }) => {
    mutate(data);
    reset();
  };
  return (
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
  );
}
