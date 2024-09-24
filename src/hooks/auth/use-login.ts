import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { useRouter } from 'next/router';

import type { Login, LoginResponse } from '@/types/auth';
import { API_PATHS, BASE_URL } from '@/constants/api';
import { ROUTES } from '@/constants/router';

const login = async ({ email, password }: Login) => {
  const { data } = await axios.post<LoginResponse>(`${BASE_URL}${API_PATHS.AUTH.LOGIN.POST()}`, { email, password });

  return data;
};

const useLogin = () => {
  const router = useRouter();
  const [toast, setToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const { mutate, isSuccess } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      void router.push(ROUTES.main);
    },
    onError: (error: AxiosError) => {
      // TODO: 에러 메세지 변경
      if (error?.response?.status === 400) {
        setToastMessage('계정이 존재하지 않습니다');
        setToast(true);
      }
    },
  });

  return { mutate, toast, toastMessage, setToast, isSuccess };
};

export default useLogin;
