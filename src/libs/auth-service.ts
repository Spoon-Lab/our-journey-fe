import type { Profile } from '@/types/profile';
import { API_PATHS } from '@/constants/api';

import axiosInstance from './axios';

export const getOtherProfile = async <T = Profile>(id: number): Promise<T> => {
  const response = await axiosInstance.get<T>(API_PATHS.PROFILES.GET(id));
  return response.data;
};
