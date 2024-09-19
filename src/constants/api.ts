/** 백엔드 쪽에서 api 나오면 작업하시면서 추가, 수정 해주시면 되겠습니다! */

// TODO : 백엔드 api 배포시 수정 필요
export const BASE_URL = 'http://3.38.47.219:8000';

export const API_PATHS = {
  TAGS: {
    GET: () => `/tags`, // 태그 가져오기
    POST: () => `/tags`, // 태그 생성
  },
  PROFILES: {
    CREATE: () => `/profiles`, // 프로필 생성
    GET: (id: number) => `/profiles/${id}`, // ID로 프로필 조회
    UPDATE: (id: number) => `/profiles/${id}`, // ID로 프로필 업데이트
    GET_LIKES_CONTENTS: (id: number) => `/profiles/${id}/likes/contents`, // 좋아요한 컨텐츠 가져오기
    GET_MY_CONTENTS: (id: number) => `/profiles/${id}/contents`, // 내가 작성한 컨텐츠 가져오기
    GET_MY_COMMENTS: (id: number) => `/profiles/${id}/comments`, // 내가 작성한 댓글 가져오기
  },
  CONTENTS: {
    GET_ALL: () => `/api/contents`, // 모든 컨텐츠 가져오기
    GET_ONE: (contentId: number) => `/api/contents/${contentId}`, // ID로 하나의 컨텐츠 조회
    DELETE: (contentId: number) => `/api/contents/${contentId}`, // ID로 컨텐츠 삭제
    PATCH: (contentId: number) => `/api/contents/${contentId}`, // ID로 컨텐츠 수정
    COMMENTS: {
      GET: (contentId: number) => `/contents/${contentId}/comments`, // 컨텐츠에 대한 모든 댓글 가져오기
      POST: (contentId: number) => `/contents/${contentId}/comments`, // 컨텐츠에 댓글 생성
      COMMENT: (contentId: number, commentId: number) => `/contents/${contentId}/comments/${commentId}`, // 댓글 수정 또는 삭제
    },
    THREADS: {
      GET: (contentId: number) => `/api/content/${contentId}/threads`, // 컨텐츠에 대한 모든 스레드 가져오기
      POST: (contentId: number) => `/api/content/${contentId}/threads`, // 컨텐츠에 스레드 생성
      PATCH: (contentId: number, threadId: number) => `/api/content/${contentId}/threads/${threadId}`, // 스레드 수정
      DELETE: (contentId: number, threadId: number) => `/api/content/${contentId}/threads/${threadId}`, // 스레드 삭제
    },
  },
  HEALTH: {
    CHECK: () => `/health`, // 서버 상태 확인 엔드포인트
  },
  CATEGORIES: {
    GET_ALL: () => `/api/categories`, // 모든 카테고리 가져오기
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
      PUT: () => `/photo/image-upload`, // 이미지 업데이트
    },
  },
};
