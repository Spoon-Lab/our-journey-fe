import type { PaginationParams } from '@/types/pagination';
import type { Thread, ThreadPostRequest, ThreadResponse } from '@/types/threads';
import { API_PATHS } from '@/constants/api';

import type { CreateThreadReqBody } from '@/hooks/threads/use-create-thread';

import axiosInstance from './axios';

export const getAllThreads = async <T = ThreadResponse>(contentId: number, paginationParams: PaginationParams): Promise<T> => {
  const response = await axiosInstance.get<T>(API_PATHS.THREADS.GET(contentId, paginationParams));
  return response.data;
};

export const createThread = async <T = Thread>(contentId: number, data: CreateThreadReqBody): Promise<T> => {
  const response = await axiosInstance.post<T>(API_PATHS.THREADS.POST(contentId), data);
  return response.data;
};

export const patchThread = async <T = Thread>(contentId: number, threadId: number, data: ThreadPostRequest): Promise<T> => {
  const response = await axiosInstance.patch<T>(API_PATHS.THREADS.PATCH(contentId, threadId), data);
  return response.data;
};

export const deleteThread = async <T = Thread>(contentId: number, threadId: number): Promise<T> => {
  const response = await axiosInstance.delete<T>(API_PATHS.THREADS.DELETE(contentId, threadId));
  return response.data;
};
