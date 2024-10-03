export interface Content {
  commentCount: number;
  contentId: number;
  contentProfileDto: ContentWriterDto;
  createdAt: string;
  isEditable: boolean;
  isLiked: boolean;
  isRemovable: boolean;
  likeCount: number;
  postImg: string;
  tags: Tag[];
  title: string;
  updatedAt: string;
}

export interface Tag {
  tagId: number;
  tagName: string;
}

export interface ContentWriterDto {
  name: string;
  profileId: number;
  profileImgUrl: string;
}

export interface ThreadWriterDto {
  imgUrl: string;
  nickName: string;
  profileId: number;
}

export interface Thread {
  createdAt: string;
  isEditable: boolean;
  isRemovable: boolean;
  profileThreadDto: ThreadWriterDto;
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
