import { useInfiniteQuery } from '@tanstack/react-query';

import type { ThreadResponse } from '@/types/threads';

import { getAllThreads } from '@/libs/threads-services';
// import { setSentryLogging } from '@/utils/error-logging';

const useGetThreads = (contentId: number) =>
  useInfiniteQuery<ThreadResponse>({
    queryKey: [`threads-#${contentId}`],
    queryFn: ({ pageParam }) => getAllThreads(contentId, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.list.last) return undefined;
      return lastPage.list.pageable.pageNumber + 1;
    },
    enabled: contentId !== -1,
    refetchOnMount: true, // 컴포넌트가 마운트될 때마다 리페치
    staleTime: 0, // 데이터를 항상 "오래된" 것으로 간주
  });

export default useGetThreads;
