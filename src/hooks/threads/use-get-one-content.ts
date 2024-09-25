import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { Content } from '@/types/threads';

import { getOneContent } from '@/libs/threads-services';

export default function useGetOneContent(contentId: number) {
  const { data, isLoading, isSuccess, error } = useQuery<Content, AxiosError>({
    queryKey: ['get-content', contentId],
    queryFn: () => getOneContent(contentId),
    enabled: contentId !== -1,
  });

  return { data, isLoading, isSuccess, error };
}
