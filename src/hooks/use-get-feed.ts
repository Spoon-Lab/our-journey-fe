import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { contents } from '@/mocks/contents';

export default function useGetFeed() {
  const [sort, setSort] = useState<'recently' | 'popularly'>('recently');

  const { data, fetchNextPage, status } = useInfiniteQuery({
    queryKey: ['test', sort],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => {
      const fetchedData = contents[`contents${pageParam as 1 | 2}`];

      if (sort === 'popularly') {
        return {
          ...fetchedData,
          content: [...fetchedData.content].sort((a, b) => a.favoriteCount - b.favoriteCount),
        };
      }

      return fetchedData;
    },
    getNextPageParam: (lastPage) => {
      const page = lastPage.pageable.pageNumber;
      if (lastPage.last) return undefined;
      return page + 1;
    },
    initialPageParam: 1,
  });

  return { data, fetchNextPage, status, sort, setSort };
}
