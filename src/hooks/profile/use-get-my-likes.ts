import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyLikes } from '@/libs/auth-service';

const useGetMyLikes = (open: boolean) =>
  useInfiniteQuery({
    queryKey: ['my-likes'],
    queryFn: ({ pageParam }) => getMyLikes(pageParam),
    getNextPageParam: (lastPage) => (!lastPage.list.last ? lastPage.list.pageable.pageNumber + 1 : undefined),
    initialPageParam: 0,
    select: (data) => data.pages,
    enabled: !!open,
  });

export default useGetMyLikes;
