import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';

import { nicknameSchema } from '@/utils/validate';

import { useFile } from '@/hooks/useFile';

import AuthHeader from '@/components/auth-header/auth-header';
import AuthIntroText from '@/components/auth-Intro-text/auth-Intro-text';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import AuthLayout from '@/components/layouts/auth-layout/auth-layout';

import s from './style.module.scss';

import { AddPhoto } from '@/assets/icons';

export default function UserInfo() {
  const { filePreview, handleChangeFile } = useFile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ nickname: string }>({
    resolver: yupResolver(nicknameSchema),
    mode: 'onBlur',
    defaultValues: {
      nickname: '',
    },
  });

  const onSubmit = () => {
    reset();
  };

  return (
    <main className={s.userInfoContainer}>
      <AuthHeader text="회원정보 입력" />
      <AuthIntroText text={`알찬 아워저니 생활을 위해\n프로필 정보를 등록해주세요!`} />
      <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.fileWrapper}>
          {filePreview ? (
            <Image src={filePreview} alt="img" width={110} height={110} />
          ) : (
            <label htmlFor="file">
              <AddPhoto />
            </label>
          )}
          <Input type="file" id="file" onChange={handleChangeFile} />
        </div>
        <Input placeholder="닉네임을 입력해주세요" id="nickname" labelText="닉네임 입력" {...register('nickname')} errorMessage={errors.nickname?.message} />
        <Button type="submit">시작하기</Button>
      </form>
    </main>
  );
}

UserInfo.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
