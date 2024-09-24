export interface ProfileThreadDto {
  imgUrl: string;
  nickName: string;
  profileId: number;
}

export interface Thread {
  createdAt: string;
  profileThreadDto: ProfileThreadDto;
  tagNames: string[];
  texts: string;
  threadId: number;
  threadImg: string;
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

export interface ThreadResponse {
  list: {
    content: Thread[];
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
  };
}

export interface ThreadPostRequest {
  tagNames?: string[];
  texts: string;
  threadImg?: string;
}
