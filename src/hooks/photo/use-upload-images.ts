import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ImageUploadRequest } from '@/libs/image-upload-service';
import { uploadImages } from '@/libs/image-upload-service';
import { setSentryLogging } from '@/utils/error-logging';

export const useUploadImagesToServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ imageType, images }: ImageUploadRequest) => uploadImages({ imageType, images }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['upload-images'] });
    },
    onError: (error) => {
      setSentryLogging(error);
      // console.error('uploadImages error', error);
    },
  });
};
