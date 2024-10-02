import type { PaginationParams } from '@/types/pagination';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_PATHS = {
  TAGS: {
    GET: (name: string) => `/tags?name=${name}`, // 해시태그 가져오기
    POST: () => `/tags`, // 해시태그 생성
  },
  PROFILES: {
    CREATE: () => `/profiles`, // 사용자 프로필 생성
    GET: (id: number) => `/profiles/${id}`, // 사용자 프로필 조회
    UPDATE: () => `/profiles`,
    GET_LIKES_CONTENTS: () => `/profiles/likes/contents`, // 특정 유저가 좋아요한 contents 가져오기
    GET_MY_CONTENTS: () => `/profiles/contents`, // 특정 유저가 작성한 contents 가져오기
    GET_MY_COMMENTS: () => `/profiles/comments`, // 특정 유저가 작성한 댓글 가져오기
  },
  CONTENTS: {
    GET_ALL: () => `/contents`, // 모든 contents 조회
    GET_ONE: (contentId: number) => `/contents/${contentId}`, // 한 contents 조회
    CREATE: () => `/contents`, // contents 생성
    DELETE: (contentId: number) => `/contents/${contentId}`, // contents 삭제
    PATCH: (contentId: number) => `/contents/${contentId}`, // contents 수정
    LIKE: {
      ADD: (contentId: number) => `/contents/${contentId}/likes`, // contents 좋아요
      REMOVE: (contentId: number) => `/contents/${contentId}/likes`, // contents 좋아요 취소
    },
  },
  COMMENTS: {
    GET: (contentId: number) => `/contents/${contentId}/comments`, // contents에 대한 모든 댓글 조회
    POST: (contentId: number) => `/contents/${contentId}/comments`, // 댓글 생성
    POST_REPLY: (contentId: number, commentId: number) => `/contents/${contentId}/comments/${commentId}`, // 대댓글 생성
    PATCH: (contentId: number, commentId: number) => `/contents/${contentId}/comments/${commentId}`, // 댓글 수정
    DELETE: (contentId: number, commentId: number) => `/contents/${contentId}/comments/${commentId}`, // 댓글 삭제
  },
  THREADS: {
    GET: (contentId: number, paginationParams: PaginationParams) => `/contents/${contentId}/threads?size=10&page=0`, // contents에 대한 모든 thread 조회
    POST: (contentId: number) => `/contents/${contentId}/threads`, // contents에 thread 생성
    PATCH: (contentId: number, threadId: number) => `/contents/${contentId}/threads/${threadId}`, // thread 수정
    DELETE: (contentId: number, threadId: number) => `/contents/${contentId}/threads/${threadId}`, // thread 삭제
  },
  HEALTH: {
    CHECK: () => `/health`, // 서버 상태 확인
  },
  CATEGORIES: {
    GET_ALL: () => `/categories`, // 카테고리 목록 조회
  },
  FOLLOW: {
    FOLLOW: (profileId: number) => `/follow/${profileId}/follow`, // 팔로우 하기
    UNFOLLOW: (profileId: number) => `/follow/${profileId}/unfollow`, // 언팔로우 하기
  },
  AUTH: {
    ACCOUNT_CONFIRM_EMAIL: {
      POST: () => `/auth/account-confirm-email`, // 이메일 확인 요청
      GET: (key: string) => `/auth/account-confirm-email/${key}`, // 이메일 확인 - 키로 조회
    },
    ADMIN_CATEGORY: {
      POST: () => `/auth/admin-category`, // 관리자 카테고리 생성
    },
    CERTIFICATE: {
      GET: () => `/auth/certificate`, // 인증서 조회
    },
    CUSTOM_LOGIN: {
      POST: () => `/auth/custom-login`, // 커스텀 로그인
    },
    GOOGLE_CALLBACK: {
      POST: () => `/auth/google/callback`, // 구글 콜백
    },
    LOGIN: {
      POST: () => `/auth/login`, // 로그인
    },
    LOGOUT: {
      POST: () => `/auth/logout`, // 로그아웃
    },
    PASSWORD: {
      CHANGE: {
        POST: (uid64: string, token: string) => `/auth/password-reset-confirm/${uid64}/${token}`, // 비밀번호 변경
      },
      RESET: {
        POST: () => `/auth/password-reset-request`, // 비밀번호 재설정 요청
        CONFIRM: {
          POST: () => `/auth/password/reset/confirm`, // 비밀번호 재설정 확인
        },
      },
    },
    SIGNUP: {
      POST: () => `/auth/signup`, // 회원가입
      RESEND_EMAIL: {
        POST: () => `/auth/signup/resend-email`, // 이메일 재전송
      },
      VERIFY_EMAIL: {
        POST: () => `/auth/signup/verify-email`, // 이메일 확인
      },
    },
    TOKEN: {
      REFRESH: {
        POST: () => `/auth/token/refresh`, // 토큰 리프레시
      },
      VERIFY: {
        POST: () => `/auth/token/verify`, // 토큰 확인
      },
    },
    USER: {
      GET: () => `/auth/user`, // 사용자 정보 조회
      UPDATE: {
        PUT: () => `/auth/user`, // 사용자 정보 수정 (전체)
        PATCH: () => `/auth/user`, // 사용자 정보 부분 수정
      },
    },
  },
  PHOTO: {
    IMAGE_UPLOAD: {
      POST: () => `/photo/image-upload`, // 이미지 업로드
    },
  },
};
