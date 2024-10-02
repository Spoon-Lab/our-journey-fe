import { API_PATHS } from '@/constants/api';

import axiosAuthInstance from './auth-axios';

export type ImageType = 'profile' | 'content' | 'thread';

export interface ImageUploadRequest {
  imageType: ImageType;
  images: File[];
}
export interface ImageUploadResponse {
  image_url: string[];
}

export const uploadImages = async <T = ImageUploadResponse>({ imageType, images }: ImageUploadRequest): Promise<T> => {
  const headerConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const formData = new FormData();
  formData.append('photo_type', imageType);
  images.forEach((image) => {
    formData.append(`images`, image);
  });
  const response = await axiosAuthInstance.post<T>(API_PATHS.PHOTO.IMAGE_UPLOAD.POST(), formData, headerConfig);
  return response.data;
};
