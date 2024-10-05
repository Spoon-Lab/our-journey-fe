import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { API_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/router';

import axiosAuthInstance from '@/libs/auth-axios';
import { setSentryLogging } from '@/utils/error-logging';

const logout = async () => {
  const refresh = localStorage.getItem('refreshToken');
  const res = await axiosAuthInstance.post(`${API_PATHS.AUTH.LOGOUT.POST()}`, {
    refresh,
  });
  return res;
};

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.clear();
      queryClient.clear();
      void router.push(ROUTES.base);
    },
    onError: (error: AxiosError) => {
      setSentryLogging(error);
      // console.error('Logout Error:', error);
    },
  });
};

export default useLogout;
