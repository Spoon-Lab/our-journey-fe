import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { API_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/router';

import axiosAuthInstance from '@/libs/auth-axios';

const logout = async () => {
  const res = await axiosAuthInstance.post(`${API_PATHS.AUTH.LOGOUT.POST()}`);
  return res;
};

const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await router.push(ROUTES.base);
    },
  });
};

export default useLogout;
