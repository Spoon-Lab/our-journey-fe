import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addLike } from '@/libs/likes-service';
import { setSentryLogging } from '@/utils/error-logging';

export const useAddLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contentId: number) => addLike(contentId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['add-like'] });
    },
    onError: (error: Error) => {
      setSentryLogging(error);
      // console.error('Error Add Like : ', error);
    },
  });
};
