import type { AxiosError } from 'axios';
import axios from 'axios';

import { API_PATHS } from '@/constants/api';

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosAuthInstance = axios.create(axiosConfig);

axiosAuthInstance.interceptors.request.use(
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

axiosAuthInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config;

    if (error.response && error.response.status === 401 && originalConfig) {
      const refresh = localStorage.getItem('refreshToken');

      try {
        const { data } = await axios.post<{ access: string }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}${API_PATHS.AUTH.TOKEN.REFRESH.POST()}`, { refresh });

        if (data?.access) {
          localStorage.setItem('accessToken', data.access);

          if (originalConfig.headers) {
            originalConfig.headers.set('Authorization', `Bearer ${data.access}`);
          }

          return axiosAuthInstance(originalConfig);
        }
      } catch (refreshError) {
        // TODO:로그아웃 처리 ?
        localStorage.clear();

        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default axiosAuthInstance;
