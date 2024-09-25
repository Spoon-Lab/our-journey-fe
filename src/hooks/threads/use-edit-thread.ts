import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Thread, ThreadReqBody } from '@/types/threads';

import { patchThread } from '@/libs/threads-services';

export const usePatchThread = () => {
  const queryClient = useQueryClient();

  return useMutation<Thread, Error, { contentId: number; data: ThreadReqBody; threadId: number }>({
    mutationFn: ({ contentId, threadId, data }) => patchThread(contentId, threadId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
    onError: (error) => {
      console.error('Error updating thread:', error);
    },
  });
};
