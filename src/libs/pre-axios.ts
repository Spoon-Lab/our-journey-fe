import axios from 'axios';

// * MEMO: 나중에 기본 axios와 통합 필요.
// ? CONCERN: 왜인지 axios를 가져다 쓰려고 하면 verce/turbopack 이슈 발생 + Can't resolve 'react-server-dom-webpack/client'가 발생함
// ? CONCERN: 빠른 구현 위해 일단 임시로 넣고, 나중에 통합 수정 적용.

const preAxiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const preAxiosInstance = axios.create(preAxiosConfig);
