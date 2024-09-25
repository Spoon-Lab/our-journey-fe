import type { PaginationParams } from '@/types/pagination';

export const createPaginationQuery = ({ page, size, sort = ['string'] }: PaginationParams): string => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort: JSON.stringify(sort),
  });

  return params.toString();
};
