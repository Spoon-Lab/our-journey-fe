import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ThreadResponse } from '@/types/threads';

import { getAllThreads } from '@/libs/threads-services';

const pageable = {
  page: 0,
  size: 1,
  sort: ['string'],
};

export default function useGetThreads(contentId: number) {
  const { data, isLoading, isSuccess, error } = useQuery<ThreadResponse, AxiosError>({
    queryKey: ['thread', contentId], // contentId를 queryKey에 포함
    queryFn: () => getAllThreads(contentId, pageable),
    enabled: contentId !== -1,
    refetchOnMount: true, // 컴포넌트가 마운트될 때마다 리페치
    staleTime: 0, // 데이터를 항상 "오래된" 것으로 간주
  });

  return { data, isLoading, isSuccess, error };
}
