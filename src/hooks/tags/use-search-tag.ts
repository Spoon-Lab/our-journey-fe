import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { PaginationParams } from '@/types/pagination';
import type { SearchTagResponse } from '@/types/tags';
import { API_PATHS } from '@/constants/api';

import axiosInstance from '@/libs/axios';

export const searchTag = async <T = SearchTagResponse>(tag: string[], paginationParams: PaginationParams): Promise<T> => {
  const response = await axiosInstance.get<T>(API_PATHS.TAGS.GET(tag, paginationParams));
  return response.data;
};

const pageable = {
  page: 0,
  size: 1,
  sort: ['string'],
};

export default function useSearchTag(tag: string[]) {
  const { data, isLoading, isSuccess, error } = useQuery<SearchTagResponse, AxiosError>({
    queryKey: ['tag'],
    queryFn: () => searchTag(tag, pageable),
    enabled: tag.length > 0,
  });

  return { data, isLoading, isSuccess, error };
}
