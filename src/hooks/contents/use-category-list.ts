import { useQuery } from '@tanstack/react-query';

import type { CategoryDtos } from '@/types/contents';
import { API_PATHS } from '@/constants/api';

import { preAxiosInstance } from '@/libs/pre-axios';
import { setSentryLogging } from '@/utils/error-logging';

export const useCategoryList = () => {
  const { data, isError, error } = useQuery({
    queryKey: ['api/category'],
    queryFn: async () => {
      const categories = (await preAxiosInstance.get(API_PATHS.CATEGORIES.GET_ALL())).data;

      return categories as Promise<CategoryDtos>;
    },
    staleTime: 60000,
  });

  if (isError) {
    setSentryLogging(error);
  }

  return { data };
};
