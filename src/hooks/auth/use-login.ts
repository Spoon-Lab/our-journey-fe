import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

import type { Login, LoginResponse } from '@/types/auth';
import { API_PATHS, BASE_URL } from '@/constants/api';
import { ROUTER } from '@/constants/router';

// import { setCookie } from '@/utils/cookie';

const login = async ({ email, password }: Login) => {
  const { data } = await axios.post<LoginResponse>(`${BASE_URL}${API_PATHS.AUTH.LOGIN.POST()}`, { email, password });

  return data;
};

const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      // setCookie('accessToken', data.access, { httpOnly: false, path: '/' });
      // setCookie('refreshToken', data.refresh, { httpOnly: false, path: '/' });

      void router.push(ROUTER.main);
    },
    onError: (error) => {
      // TODO: 토스트메세지로 오류?
    },
  });
};

export default useLogin;
