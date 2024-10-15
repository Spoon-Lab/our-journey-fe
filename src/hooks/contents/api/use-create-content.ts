import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ContentPostRequest, CreateContentResponse } from '@/types/contents';

import { createContent } from '@/libs/content-service';
import { setSentryLogging } from '@/utils/error-logging';

export default function useCreateContent() {
  const queryClient = useQueryClient();

  return useMutation<CreateContentResponse, AxiosError, { body: ContentPostRequest }>({
    mutationFn: ({ body }) => createContent(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['create-content'] });
    },
    onError: (error: Error) => {
      setSentryLogging(error);
    },
  });
}
