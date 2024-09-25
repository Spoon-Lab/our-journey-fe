import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { Thread, ThreadReqBody } from '@/types/threads';

import { createThread } from '@/libs/threads-services';

export const useCreateThreads = () => {
  const queryClient = useQueryClient();

  return useMutation<Thread, AxiosError, { contentId: number; reqBody: ThreadReqBody }>({
    mutationFn: ({ contentId, reqBody }) => createThread(contentId, reqBody),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
    onError: (error: AxiosError) => {
      console.error('Error creating thread:', error);
    },
  });
};
