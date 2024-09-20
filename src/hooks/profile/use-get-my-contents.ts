import { useInfiniteQuery } from '@tanstack/react-query';

import { myContents } from '@/mocks/profile';

const getMyContents = () => myContents;

// const { data } = await axiosInstance.get<Contents>(`${API_PATHS.PROFILES.GET_MY_COMMENTS(id)}`);
// return data;

const useGetMyContents = ({ id, open }: { id: number; open: boolean }) =>
  useInfiniteQuery({
    queryKey: ['auth', 'contents', id],
    queryFn: () => getMyContents(),
    getNextPageParam: (lastPage) => (lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined),
    initialPageParam: 1,
    select: (data) => data.pages,
    enabled: open,
  });

export default useGetMyContents;
