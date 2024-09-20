import { useMutation } from '@tanstack/react-query';

import { API_PATHS } from '@/constants/api';

import axiosInstance from '@/libs/axios';

interface UploadImgProps {
  images: FormData[];
  photo_type: 'profile' | 'thread';
  thread_id?: number;
}

const uploadImg = async ({ photo_type, thread_id, images }: UploadImgProps) => {
  await axiosInstance.post(
    `${API_PATHS.PHOTO.IMAGE_UPLOAD.POST()}`,
    {
      photo_type,
      ...(thread_id && { thread_id }),
      images,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

const useUploadImg = () =>
  useMutation({
    mutationFn: uploadImg,
  });

export default useUploadImg;
