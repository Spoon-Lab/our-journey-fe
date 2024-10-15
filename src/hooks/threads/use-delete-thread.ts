import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Thread } from '@/types/threads';

import { deleteThread } from '@/libs/threads-services';
import { setSentryLogging } from '@/utils/error-logging';

export const useDeleteThread = () => {
  const queryClient = useQueryClient();

  return useMutation<Thread, Error, { contentId: number; threadId: number }>({
    mutationFn: ({ contentId, threadId }) => deleteThread(contentId, threadId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['threads-delete'] });
    },
    onError: (error) => {
      setSentryLogging(error);
      // console.error('Error deleting thread:', error);
    },
  });
};
