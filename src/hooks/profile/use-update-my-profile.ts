import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { API_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/router';

import axiosInstance from '@/libs/axios';

interface Profile {
  imageUrl: string;
  nickname: string;
  selfIntroduction: string;
}

const updateProfile = async ({ nickname, imageUrl, selfIntroduction }: Profile): Promise<Profile> => {
  const res = await axiosInstance.patch<Profile>(API_PATHS.PROFILES.UPDATE(), { nickname, imageUrl, selfIntroduction });
  return res.data;
};

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['profile'] });
      void router.push(ROUTES.profile);
    },
    onError: (error: AxiosError) => {
      console.error('Error updating profile:', error);
    },
  });
};
