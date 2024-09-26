import type { AxiosError } from 'axios';
import axios from 'axios';

import { API_PATHS } from '@/constants/api';

import axiosAuthInstance from './auth-axios';

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config;

    if (error.response && error.response.status === 401 && originalConfig) {
      const refresh = localStorage.getItem('refreshToken');

      try {
        const { data } = await axiosAuthInstance.post<{ access: string }>(`${API_PATHS.AUTH.TOKEN.REFRESH.POST()}`, { refresh });

        if (data?.access) {
          localStorage.setItem('accessToken', data.access);

          if (originalConfig.headers) {
            originalConfig.headers.set('Authorization', `Bearer ${data.access}`);
          }

          return axiosInstance(originalConfig);
        }
      } catch (refreshError) {
        // TODO:로그아웃 처리 ? - 캐시데이터도 삭제 해야할수도
        console.log(refreshError);
        localStorage.clear();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
