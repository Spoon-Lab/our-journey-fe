import { useQuery } from '@tanstack/react-query';

import type { CategoryDtos } from '@/types/contents';
import { API_PATHS } from '@/constants/api';

import { testInstance } from '@/libs/test';

export const useCategoryList = () => {
  const { data } = useQuery({
    queryKey: ['api/category'],
    queryFn: async () => {
      const categories = (await testInstance.get(API_PATHS.CATEGORIES.GET_ALL())).data;

      return categories as Promise<CategoryDtos>;
    },
    staleTime: 60000,
  });

  return { data };
};
