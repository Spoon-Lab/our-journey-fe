import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { contents, domesticContents, foreignContents, titleContents } from '@/mocks/contents';

interface Props {
  categoryId?: string;
  title?: string;
}

export default function useGetFeed(props: Props) {
  const [sort, setSort] = useState<'recently' | 'popularly'>('recently');

  const categoryId = props?.categoryId;
  const title = props?.title;

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['test', sort, categoryId, title],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => {
      let fetchedData = contents[`contents${pageParam as 1 | 2}`];

      if (categoryId || title) {
        if (categoryId === 'domestic') fetchedData = domesticContents[`contents${pageParam as 1 | 2}`];
        if (categoryId === 'foreign') fetchedData = foreignContents[`contents${pageParam as 1 | 2}`];
        if (title) fetchedData = titleContents[`contents${pageParam as 1 | 2}`];
      }

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

  return { data, fetchNextPage, sort, setSort, hasNextPage };
}
