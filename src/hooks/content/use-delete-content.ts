import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteContent } from '@/libs/content-service';

export const useDeleteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contentId: number) => deleteContent(contentId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting content: ', error);
    },
  });
};
