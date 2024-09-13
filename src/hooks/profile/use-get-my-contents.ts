import { useInfiniteQuery } from '@tanstack/react-query';

import { contents } from '@/mocks/contents';

interface ContentProps {
  id: number;
  page: number;
  size: number;
}

const getMyContents = ({ page, size, id }: ContentProps) => contents[`contents${page as 1 | 2}`];

// const { data } = await axiosInstance.get<Contents>(`${API_PATHS.PROFILES.GET_MY_COMMENTS(id)}`);
// return data;

const useGetMyContents = ({ id, open }: { id: number; open: boolean }) =>
  useInfiniteQuery({
    queryKey: ['auth', 'contents', id],
    queryFn: ({ pageParam }) => getMyContents({ id, page: pageParam, size: 3 }),
    getNextPageParam: (lastPage) => (lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined),
    initialPageParam: 1,
    select: (data) => data.pages,
    enabled: open,
  });

export default useGetMyContents;
