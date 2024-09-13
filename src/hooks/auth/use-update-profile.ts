import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { API_PATHS } from '@/constants/api';
import { ROUTER } from '@/constants/router';

import axiosInstance from '@/libs/axios';

const updateProfile = async (id: number) => {
  const res = await axiosInstance.patch(`${API_PATHS.PROFILES.UPDATE(id)}`);

  return res;
};

const useUpdateProfile = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: async () => {
      await router.push(ROUTER.main);
    },
  });
};

export default useUpdateProfile;
