import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { createThread } from '@/libs/threads-services';

export interface CreateThreadReqBody {
  tagIds: number[];
  texts: string;
  threadImg: string;
}
export interface CreateThreadResponse {
  threadId: number;
}

export const useCreateThreads = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateThreadResponse, AxiosError, { contentId: number; reqBody: CreateThreadReqBody }>({
    mutationFn: ({ contentId, reqBody }) => createThread(contentId, reqBody),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
    onError: (error: AxiosError) => {
      console.error('Error creating thread:', error);
    },
  });
};
