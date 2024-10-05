import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { API_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/router';

import axiosInstance from '@/libs/axios';
import { setSentryLogging } from '@/utils/error-logging';

import { useToast } from '../use-toast';

interface Profile {
  imageUrl: string;
  nickname: string;
  selfIntroduction: string | null;
}

const updateProfile = async ({ nickname, imageUrl, selfIntroduction }: Profile): Promise<Profile> => {
  const res = await axiosInstance.patch<Profile>(API_PATHS.PROFILES.UPDATE(), { nickname, imageUrl, selfIntroduction });
  return res.data;
};

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      addToast('내정보 수정이 완료되었습니다', 'info', 1500);
      void queryClient.invalidateQueries({ queryKey: ['profile'] });
      void router.push(ROUTES.profile);
    },
    onError: (error: AxiosError) => {
      setSentryLogging(error);
      // console.error('Error updating profile:', error);
    },
  });
};
