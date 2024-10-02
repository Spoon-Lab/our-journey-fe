import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ImageUploadRequest } from '@/libs/image-upload-service';
import { uploadImages } from '@/libs/image-upload-service';

export const useUploadImagesToServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ imageType, images }: ImageUploadRequest) => uploadImages({ imageType, images }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['upload-images'] });
    },
    onError: (error) => {
      console.error('uploadImages error', error);
    },
  });
};
