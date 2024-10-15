import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { createThread } from '@/libs/threads-services';
import { setSentryLogging } from '@/utils/error-logging';

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
    onSuccess: (_data, { contentId }) => {
      void queryClient.invalidateQueries({ queryKey: [`new-threads-#${contentId}`] });
    },
    onError: (error: AxiosError) => {
      setSentryLogging(error);
      // console.error('Error creating thread:', error);
    },
  });
};
