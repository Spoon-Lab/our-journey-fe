import { useInfiniteQuery } from '@tanstack/react-query';

import type { MyContents } from '@/types/contents';
import { API_PATHS } from '@/constants/api';

import axiosInstance from '@/libs/axios';

const getMyContents = async (page: number) => {
  const { data } = await axiosInstance.get<MyContents>(`${API_PATHS.PROFILES.GET_MY_CONTENTS()}?page=${page}&size=4`);

  return data;
};

const useGetMyContents = ({ open }: { open: boolean }) =>
  useInfiniteQuery({
    queryKey: ['contents'], // TODO:변경해야할듯
    queryFn: ({ pageParam }) => getMyContents(pageParam),
    getNextPageParam: (lastPage) => (!lastPage.list.last ? lastPage.list.pageable.pageNumber + 1 : undefined),
    initialPageParam: 0,
    select: (data) => data.pages,
    enabled: open,
  });

export default useGetMyContents;
