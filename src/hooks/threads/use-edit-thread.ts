import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Thread, ThreadPatchRequest } from '@/types/threads';

import { patchThread } from '@/libs/threads-services';
import { setSentryLogging } from '@/utils/error-logging';

export const useEditThread = () => {
  const queryClient = useQueryClient();

  return useMutation<Thread, Error, { contentId: number; data: ThreadPatchRequest; threadId: number }>({
    mutationFn: ({ contentId, threadId, data }) => patchThread(contentId, threadId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
    onError: (error) => {
      setSentryLogging(error);
      // console.error('Error updating thread:', error);
    },
  });
};
