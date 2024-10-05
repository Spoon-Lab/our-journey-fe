import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import type { Contents } from '@/types/contents';
import { API_PATHS } from '@/constants/api';

import { preAxiosInstance } from '@/libs/pre-axios';
import { setSentryLogging } from '@/utils/error-logging';

interface Props {
  categoryId?: string;
  title?: string;
}

export default function useGetContents(props: Props) {
  const [sort, setSort] = useState<'recently' | 'popularly'>('recently');

  const categoryId = props?.categoryId;
  const title = props?.title;
  // { pageParam = 1 }: { pageParam?: number }

  const { data, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery({
    queryKey: ['api/get-contents', sort, categoryId, title],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      let api = `${API_PATHS.CONTENTS.GET_ALL()}?size=10&page=${pageParam}`;

      // * 페이지 위치 따른 배치도 추가 고려 필여
      if (categoryId || title) {
        if (categoryId && title) api = `${api}&categoryId=${categoryId}&title=${title}`;
        if (categoryId && !title) api = `${api}&categoryId=${categoryId}`;
        if (!categoryId && title) api = `${api}&title=${title}`;
      }
      const list = (await preAxiosInstance.get(`${api}`)).data;

      return list as Promise<Contents>;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.list.last) return undefined;
      const nextPage = lastPage.list.pageable.pageNumber + 1;
      return nextPage;
    },
    initialPageParam: 0,
  });

  if (isError) {
    setSentryLogging(error);
  }

  return { data, fetchNextPage, sort, setSort, hasNextPage };
}
