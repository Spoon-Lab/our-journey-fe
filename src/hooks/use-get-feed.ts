import { useInfiniteQuery } from '@tanstack/react-query';

import { contents } from '@/mocks/contents';

const getMainPageFeedList = ({ pageParam = 1 }: { pageParam?: number }) =>
  // const response = await axios.get(`${BASE_URL}${API_PATHS.CONTENTS.GET_ALL()}/data.json?pages=${pageParam}`);
  // return response.data as { data: Contents[]; pageNo: number };
  contents[`contents${pageParam as 1 | 2}`];

export default function useGetFeed() {
  const { data, fetchNextPage, status } = useInfiniteQuery({
    queryKey: ['test'],
    queryFn: getMainPageFeedList,
    getNextPageParam: (lastPage) => {
      const page = lastPage.pageable.pageNumber;
      if (lastPage.last) return undefined;
      return page + 1;
    },
    initialPageParam: 1, // 초기 페이지 매개변수 설정
  });

  return { data, fetchNextPage, status };
}
