import { type ReactNode, useEffect, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { setSentryLogging } from '@/utils/error-logging';
import { userInfoSchema } from '@/utils/validate';

import useGetMyProfile from '@/hooks/profile/use-get-my-profile';
import { useUpdateMyProfile } from '@/hooks/profile/use-update-my-profile';
import { useImage } from '@/hooks/use-image';
import useUploadImg from '@/hooks/use-upload-img';

import Input from '@/components/input';
import ProfileLayout from '@/components/layouts/profile-layout';
import Modal from '@/components/modal';

import ProfileHeader from '../(components)/profile-header';

import s from './style.module.scss';

import { DefaultProfile, EditIcon } from '@/assets/icons';

export default function Edit() {
  const router = useRouter();
  const { filePreview, handleChangeFile, file } = useImage();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { data: profile, isError, error } = useGetMyProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<{ nickname: string; selfIntroduction?: string | null }>({
    resolver: yupResolver(userInfoSchema),
    mode: 'onBlur',
    defaultValues: {
      nickname: profile?.nickname,
      selfIntroduction: profile?.selfIntroduction,
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        nickname: profile.nickname,
        selfIntroduction: profile.selfIntroduction,
      });
    }
  }, [profile, reset]);

  const changedNickname = watch('nickname');
  const changedIntroduction = watch('selfIntroduction');

  const { mutate } = useUploadImg({
    nickname: changedNickname || (profile?.nickname as string),
    selfIntroduction: changedIntroduction === '' ? null : changedIntroduction || profile?.selfIntroduction || null,
  });
  const { mutate: updateProfile } = useUpdateMyProfile();

  const onSubmit = () => {
    if (file) {
      mutate({
        photo_type: 'profile',
        images: [file],
      });
    } else if (changedNickname || changedIntroduction) {
      updateProfile({
        nickname: changedNickname || (profile?.nickname as string),
        imageUrl: profile?.imageUrl as string,
        selfIntroduction: changedIntroduction === '' ? null : changedIntroduction || profile?.selfIntroduction || null,
      });
      reset();
    }
  };
  const handleBack = () => {
    if (file || changedNickname !== profile?.nickname || changedIntroduction !== profile?.selfIntroduction) setModalOpen((prev) => !prev);
    else router.back();
  };

  useEffect(() => {
    if (isError) {
      setSentryLogging(error);
    }
  }, [isError, error]);

  return (
    <>
      {modalOpen && (
        <Modal
          text="변경 사항이 저장되지 않았습니다"
          subText={`저장하지 않으면 닉네임이 적용되지 않습니다.\n저장하시겠습니까?`}
          leftBtnText="뒤로가기"
          rightBtnText="저장하기"
          leftBtnClick={() => router.back()}
          rightBtnClick={onSubmit}
        />
      )}
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
              <Image src={filePreview} alt="img" width={76} height={76} />
            ) : profile?.imageUrl ? (
              <img src={profile?.imageUrl} alt="profile img" />
            ) : (
              <DefaultProfile />
            )}
            <label htmlFor="file">
              <EditIcon />
            </label>
            <Input type="file" id="file" onChange={handleChangeFile} />
          </figure>
          <div className={s.userInfoWrapper}>
            <div>{profile?.nickname}</div>
            <p>{profile?.selfIntroduction}</p>
          </div>
        </div>
        <Input labelText="닉네임 입력" placeholder="변경할 닉네임을 입력해주세요" {...register('nickname')} errorMessage={errors.nickname?.message} />
        <Input
          labelText="한 줄 소개 입력"
          placeholder="한 줄 소개를 입력해주세요"
          {...register('selfIntroduction')}
          errorMessage={errors.selfIntroduction?.message}
        />
      </form>
    </>
  );
}

Edit.getLayout = (page: ReactNode) => <ProfileLayout>{page}</ProfileLayout>;
