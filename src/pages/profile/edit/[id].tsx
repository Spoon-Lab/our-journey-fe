import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { nicknameSchema } from '@/utils/validate';

import { useFile } from '@/hooks/useFile';

import Input from '@/components/input';
import ProfileLayout from '@/components/layouts/profile-layout/profile-layout';

import ProfileHeader from '../components/profile-header';

import s from './style.module.scss';

import { EditIcon } from '@/assets/icons';

export default function Edit() {
  const router = useRouter();
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

  const handleBack = () => {
    // TODO: 모달
    router.back();
  };

  return (
    <form className={s.editContainer} onSubmit={handleSubmit(onSubmit)}>
      <ProfileHeader
        text="프로필 수정"
        button={
          <button className={s.saveBtn} type="submit">
            저장
          </button>
        }
        iconClick={handleBack}
      />
      <div className={s.profileWrapper}>
        <figure className={s.profileImg}>
          {filePreview ? (
            <Image src={filePreview} alt="img" width={110} height={110} />
          ) : (
            <Image src="/images/default_profile.png" alt="profile img" width={76} height={76} />
          )}
          <label htmlFor="file">
            <EditIcon />
          </label>
          <Input type="file" id="file" onChange={handleChangeFile} />
        </figure>
        <div className={s.userInfoWrapper}>
          <div>졸린 무지</div>
          <p>2342@gmail.com</p>
        </div>
      </div>
      <Input labelText="닉네임 입력" placeholder="변경할 닉네임을 입력해주세요" {...register('nickname')} errorMessage={errors.nickname?.message} />
    </form>
  );
}

Edit.getLayout = (page: ReactNode) => <ProfileLayout>{page}</ProfileLayout>;
