import { useQuery } from '@tanstack/react-query';

import { getOneContent } from '@/libs/threads-services';

export default function useGetOneContent(contentId: number) {
  const {
    data: content,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['get-content', contentId],
    queryFn: () => getOneContent(contentId),
    enabled: contentId !== -1,
  });

  return { content, isLoading, error };
}
