import type { AxiosError } from 'axios';
import axios from 'axios';

import { API_PATHS } from '@/constants/api';

import type { CustomAxiosRequestConfig } from './auth-axios';
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

axiosAuthInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as CustomAxiosRequestConfig;
    // eslint-disable-next-line no-underscore-dangle
    if (error.response && error.response.status === 401 && originalConfig && !originalConfig._retry) {
      // eslint-disable-next-line no-underscore-dangle
      originalConfig._retry = true;

      const refresh = localStorage.getItem('refreshToken');

      if (refresh) {
        try {
          const { data } = await axiosAuthInstance.post<{ access: string }>(`${API_PATHS.AUTH.TOKEN.REFRESH.POST()}`, { refresh });

          if (data?.access) {
            localStorage.setItem('accessToken', data.access);

            if (originalConfig.headers) {
              originalConfig.headers.Authorization = `Bearer ${data.access}`;
            }

            return axiosAuthInstance(originalConfig);
          }
        } catch (refreshError) {
          // TODO:로그아웃 처리?
          localStorage.clear();
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
