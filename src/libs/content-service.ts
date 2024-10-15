import type { ContentPostRequest, Contents, CreateContentResponse } from '@/types/contents';
import { API_PATHS } from '@/constants/api';

import type { EditContentReqBody } from '@/hooks/contents/api/use-edit-content';

import axiosInstance from './axios';

export const getAllContents = async <T = Contents>(): Promise<T> => {
  const response = await axiosInstance.get<T>(API_PATHS.CONTENTS.GET_ALL());
  return response.data;
};

export const getOneContent = async <T = Contents>(contentId: number): Promise<T> => {
  const response = await axiosInstance.get<T>(API_PATHS.CONTENTS.GET_ONE(contentId));
  return response.data;
};

export const createContent = async <T = CreateContentResponse>(data: ContentPostRequest): Promise<T> => {
  const response = await axiosInstance.post<T>(API_PATHS.CONTENTS.CREATE(), data);
  return response.data;
};

export const deleteContent = async (contentId: number): Promise<void> => {
  const response = await axiosInstance.delete(API_PATHS.CONTENTS.DELETE(contentId));
  if (response.status === 200) {
    return;
  }

  throw new Error(`Failed to delete content(ID: ${contentId}). Status: ${response.status}`);
};

export const editContent = async <T = Contents>(contentId: number, data: EditContentReqBody): Promise<T> => {
  const response = await axiosInstance.patch<T>(API_PATHS.CONTENTS.PATCH(contentId), data);
  return response.data;
};
