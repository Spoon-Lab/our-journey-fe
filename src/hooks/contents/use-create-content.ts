import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { Content, ContentPostRequest } from '@/types/contents';

import { createContent } from '@/libs/content-service';

export default function useCreateContent() {
  const queryClient = useQueryClient();

  return useMutation<Content, AxiosError, { body: ContentPostRequest }>({
    mutationFn: ({ body }) => createContent(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['create-content'] });
    },
    onError: (error: Error) => {},
  });
}
