import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { API_PATHS } from '@/constants/api';

import axiosAuthInstance from '@/libs/auth-axios';

import { useUpdateMyProfile } from './profile/use-update-my-profile';

interface UploadImgProps {
  images: File[];
  photo_type: 'profile' | 'thread';
  thread_id?: number;
}

const uploadImg = async ({ photo_type, thread_id, images }: UploadImgProps) => {
  const formData = new FormData();

  formData.append('photo_type', photo_type);

  if (thread_id) {
    formData.append('thread_id', String(thread_id));
  }

  images.forEach((e) => {
    formData.append('images', e);
  });

  const { data } = await axiosAuthInstance.post<{ image_url: string }>(`${API_PATHS.PHOTO.IMAGE_UPLOAD.POST()}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

const useUploadImg = (nickname: string) => {
  const { mutate: updateProfileMutate } = useUpdateMyProfile();

  const [toast, setToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const { mutate, isSuccess } = useMutation({
    mutationFn: uploadImg,
    onSuccess: (data) => {
      updateProfileMutate({
        nickname,
        imageUrl: data.image_url,
        selfIntroduction: 'test',
      });
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        const errorMessage = (error.response.data as { detail: string })?.detail;
        setToastMessage(errorMessage);
        setToast(true);
      }
    },
  });

  return { mutate, toast, toastMessage, isSuccess, setToast };
};

export default useUploadImg;
