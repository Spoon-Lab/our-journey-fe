import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { SearchTagResponse } from '@/types/tags';
import { API_PATHS } from '@/constants/api';

import axiosInstance from '@/libs/axios';

export const searchTag = async <T = SearchTagResponse>(tag: string): Promise<T> => {
  const response = await axiosInstance.get<T>(API_PATHS.TAGS.GET(tag));
  return response.data;
};

/**
 * tag keyword를 받아 해당 태그를 검색합니다.
 * @param tag 검색할 태그 키워드
 */
export default function useSearchTag(tag: string) {
  const { data, isLoading, isSuccess, error, refetch } = useQuery<SearchTagResponse, AxiosError>({
    queryKey: ['tag', tag], // 태그를 queryKey에 포함
    queryFn: () => searchTag(tag),
    enabled: tag.length > 0,
    staleTime: 0, // 데이터를 항상 'stale'로 간주
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 방지
  });

  return { data, isLoading, isSuccess, error, refetch };
}
