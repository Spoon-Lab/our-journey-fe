import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

import { API_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/router';

const logout = async () => {
  // axiosInstance로 변경
  const res = await axios.post(`${API_PATHS.AUTH.LOGOUT.POST()}`);
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
