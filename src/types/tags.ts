export interface Tag {
  tagId: number;
  tagName: string;
}

export interface Sort {
  ascending: boolean;
  direction: string;
  ignoreCase: boolean;
  nullHandling: string;
  property: string;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort[];
  unpaged: boolean;
}

export interface ListContent {
  content: Tag[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort[];
  totalElements: number;
  totalPages: number;
}

export interface SearchTagResponse {
  list: ListContent;
}
