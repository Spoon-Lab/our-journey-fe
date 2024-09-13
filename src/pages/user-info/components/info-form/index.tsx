import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';

import { nicknameSchema } from '@/utils/validate';

import { useImage } from '@/hooks/use-image';

import Button from '@/components/button';
import Input from '@/components/input';

import s from './style.module.scss';

import { AddPhoto } from '@/assets/icons';

export default function InfoForm() {
  const { filePreview, handleChangeFile } = useImage();

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

  // const { mutate } = useUpdateProfile();
  // const { mutate: fileMutate } = useUploadImg();

  const onSubmit = () => {
    // // 체리님이 프로필 수정관련  스웨거 수정해주시면 수정해야할 것 같습니다
    // if (file) {
    //   fileMutate({
    //     photo_type: 'profile',
    //     images: [file],
    //   });
    //   // mutate()
    // } else {
    //   // mutate()
    // }

    reset();
  };
  return (
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
  );
}
