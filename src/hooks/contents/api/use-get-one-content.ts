import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { Content } from '@/types/threads';

import { getOneContent } from '@/libs/content-service';
import { setSentryLogging } from '@/utils/error-logging';

export default function useGetOneContent(contentId: number) {
  const { data, isLoading, isSuccess, isError, error } = useQuery<Content, AxiosError>({
    queryKey: ['get-content', contentId],
    queryFn: () => getOneContent(contentId),
    enabled: contentId !== -1,
  });

  if (isError) {
    setSentryLogging(error);
  }

  return { data, isLoading, isSuccess, error };
}
