import type { Profile } from '@/types/profile';
import { API_PATHS } from '@/constants/api';

import axiosInstance from './axios';

// profile
export const getOtherProfile = async <T = Profile>(id: number): Promise<T> => {
  const res = await axiosInstance.get<T>(API_PATHS.PROFILES.GET(id));

  return res.data;
};

export const getMyProfile = async <T = Profile>(): Promise<T> => {
  const res = await axiosInstance.get<T>(`${API_PATHS.PROFILES.GET_MY()}`);

  return res.data;
};
