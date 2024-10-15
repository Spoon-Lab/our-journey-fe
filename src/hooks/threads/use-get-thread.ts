import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ThreadResponse } from '@/types/threads';

import { getOneThread } from '@/libs/threads-services';
import { setSentryLogging } from '@/utils/error-logging';

export default function useGetThreads(contentId: number, threadId: number) {
  const { data, isLoading, isSuccess, isError, error } = useQuery<ThreadResponse, AxiosError>({
    queryKey: ['thread', contentId], // contentId를 queryKey에 포함
    queryFn: () => getOneThread(contentId, threadId),
    enabled: contentId !== -1,
    refetchOnMount: true, // 컴포넌트가 마운트될 때마다 리페치
    staleTime: 0, // 데이터를 항상 "오래된" 것으로 간주
  });

  if (isError) {
    setSentryLogging(error);
  }

  return { data, isLoading, isSuccess, error };
}
