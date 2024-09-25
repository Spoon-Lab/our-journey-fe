import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addLike } from '@/libs/likes-service';

export const useDeleteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contentId: number) => addLike(contentId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['add-like'] });
    },
    onError: (error: Error) => {
      console.error('Error Add Like : ', error);
    },
  });
};
