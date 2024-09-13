export interface Contents {
  list: {
    content: Content[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      sort: [
        {
          ascending: boolean;
          direction: string;
          ignoreCase: boolean;
          nullHandling: string;
          property: string;
        },
      ];
      unpaged: boolean;
    };
    size: number;
    sort: [
      {
        ascending: boolean;
        direction: string;
        ignoreCase: boolean;
        nullHandling: string;
        property: string;
      },
    ];
    totalElements: number;
    totalPages: number;
  };
}

export interface Content {
  contentId: number;
  createdAt: string;
  nickname: string;
  postImg: string;
  profileImg: string;
  title: string;
  updatedAt: string;
}
