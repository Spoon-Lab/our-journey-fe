import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ContentPostRequest } from '@/types/contents';

import { createContent } from '@/libs/content-service';

export default function useCreateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newContent: ContentPostRequest) => createContent(newContent),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['create-content'] });
    },
    onError: (error: Error) => {},
  });
}
