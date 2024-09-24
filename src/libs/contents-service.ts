import type { ContentPostRequest, Contents } from '@/types/contents';
import { API_PATHS } from '@/constants/api';

import { preAxiosInstance } from './pre-axios';

export const getAllContents = async <T = Contents>(): Promise<T> => {
  const response = await preAxiosInstance.get<T>(API_PATHS.CONTENTS.GET_ALL());
  return response.data;
};

export const getOneContent = async <T = Contents>(contentId: number): Promise<T> => {
  const response = await preAxiosInstance.get<T>(API_PATHS.CONTENTS.GET_ONE(contentId));
  return response.data;
};

export const createContent = async <T = Contents>(data: ContentPostRequest): Promise<T> => {
  const response = await preAxiosInstance.post<T>(API_PATHS.CONTENTS.CREATE(), data);
  return response.data;
};

export const deleteContent = async <T = Contents>(contentId: number): Promise<T> => {
  const response = await preAxiosInstance.delete<T>(API_PATHS.CONTENTS.DELETE(contentId));
  return response.data;
};

export const patchContent = async <T = Contents>(contentId: number, data: ContentPostRequest): Promise<T> => {
  const response = await preAxiosInstance.patch<T>(API_PATHS.CONTENTS.PATCH(contentId), data);
  return response.data;
};
