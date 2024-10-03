import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Thread } from '@/types/threads';

import { editContent } from '@/libs/content-service';

export interface EditContentReqBody {
  imgUrl: string;
  tags: number[];
  title: string;
}

export const useEditContent = () => {
  const queryClient = useQueryClient();

  return useMutation<Thread, Error, { contentId: number; data: EditContentReqBody }>({
    mutationFn: ({ contentId, data }) => editContent(contentId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
    onError: (error) => {
      console.error('Error updating thread:', error);
    },
  });
};
