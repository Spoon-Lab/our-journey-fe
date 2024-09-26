import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { API_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/router';

import axiosAuthInstance from '@/libs/auth-axios';

const logout = async () => {
  const refresh = localStorage.getItem('refreshToken');
  const res = await axiosAuthInstance.post(`${API_PATHS.AUTH.LOGOUT.POST()}`, {
    refresh,
  });
  return res;
};

const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.clear();
      void router.push(ROUTES.base);
    },
  });
};

export default useLogout;
