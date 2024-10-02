import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_PATHS } from '@/constants/api';

import axiosInstance from '@/libs/axios';

interface CreateTagReq {
  tagName: string;
}
interface CreateTagRes {
  tagId: number;
}

export const createTag = async <T = CreateTagRes>({ tagName }: CreateTagReq): Promise<T> => {
  const response = await axiosInstance.post<T>(API_PATHS.TAGS.POST(), { tagName });
  return response.data;
};

export default function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation<CreateTagRes, Error, { body: CreateTagReq }>({
    mutationFn: ({ body }) => createTag(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['create-tag'] });
    },
    onError: (error: Error) => {},
  });
}
