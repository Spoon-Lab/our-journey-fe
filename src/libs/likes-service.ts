import { API_PATHS } from '@/constants/api';

import axiosInstance from './axios';

export const addLike = async <T = number>(contentId: number): Promise<T> => {
  const response = await axiosInstance.post<T>(API_PATHS.CONTENTS.LIKE.ADD(contentId));
  return response.data;
};

export const removeLike = async (contentId: number): Promise<void> => {
  const response = await axiosInstance.delete(API_PATHS.CONTENTS.LIKE.REMOVE(contentId));
  if (response.status === 200) {
    return;
  }
  throw new Error(`Failed to remove like (content id: ${contentId}). Status: ${response.status}`);
};
