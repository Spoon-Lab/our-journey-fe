import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { Thread } from '@/types/threads';

import { getAllThreads } from '@/libs/threads-services';

const pageable = {
  page: 0,
  size: 1,
  sort: ['string'],
};

export default function useGetThreads(contentId: number) {
  const { data, isLoading, isSuccess, error } = useQuery<Thread, AxiosError>({
    queryKey: ['thread'],
    queryFn: () => getAllThreads(contentId, pageable),
    enabled: contentId !== -1,
  });

  return { data, isLoading, isSuccess, error };
}
