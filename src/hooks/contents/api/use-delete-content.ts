import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteContent } from '@/libs/content-service';
import { setSentryLogging } from '@/utils/error-logging';

export const useDeleteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contentId: number) => deleteContent(contentId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
    onError: (error: Error) => {
      setSentryLogging(error);
      // console.error('Error deleting content: ', error);
    },
  });
};
