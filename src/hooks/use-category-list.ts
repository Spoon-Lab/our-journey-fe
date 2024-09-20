import { useQuery } from '@tanstack/react-query';

import { categories } from '@/mocks/categories';

export const useCategoryList = () => {
  const { data } = useQuery({
    queryKey: ['api/category'],
    queryFn: () => {
      const fetchedData = categories;

      return fetchedData;
    },
    staleTime: 60000,
  });

  return { data };
};
