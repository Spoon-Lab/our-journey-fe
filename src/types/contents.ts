export interface Contents {
  list: {
    content: Content[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: ContentPageable;
    size: number;
    sort: ContentSort[];
    totalElements: number;
    totalPages: number;
  };
}

export interface Content {
  contentId: number;
  contentProfileDto: {
    name: string;
    profileId: number;
    profileImgUrl: string;
  };
  createdAt: string;
  favoriteCount: number;
  postImg: string;
  title: string;
  updatedAt: string;
}

interface ContentSort {
  ascending: boolean;
  direction: string;
  ignoreCase: boolean;
  nullHandling: string;
  property: string;
}

interface ContentPageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: ContentSort[];
  unpaged: boolean;
}
