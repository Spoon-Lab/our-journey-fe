import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import type { Login, LoginResponse } from '@/types/auth';
import { API_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/router';

import axiosAuthInstance from '@/libs/auth-axios';

const login = async ({ email, password }: Login) => {
  const { data } = await axiosAuthInstance.post<LoginResponse>(`${API_PATHS.AUTH.LOGIN.POST()}`, { email, password });

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
      if (error?.response?.status === 400) {
        const errorMessage = (error.response.data as { error: string[] })?.error[0];
        setToastMessage(errorMessage);
        setToast(true);
      }
    },
  });

  return { mutate, toast, toastMessage, setToast, isSuccess };
};

export default useLogin;
