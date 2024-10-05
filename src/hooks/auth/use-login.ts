import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import type { Login, LoginResponse } from '@/types/auth';
import { API_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/router';

import { axiosBasicAuthInstance } from '@/libs/auth-axios';
import { setSentryLogging } from '@/utils/error-logging';

import { useToast } from '../use-toast';

const login = async ({ email, password }: Login) => {
  const { data } = await axiosBasicAuthInstance.post<LoginResponse>(`${API_PATHS.AUTH.LOGIN.POST()}`, { email, password });

  return data;
};

const useLogin = () => {
  const router = useRouter();
  const { addToast } = useToast();

  const { mutate, isSuccess } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      void router.push(ROUTES.main);
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400 || error?.response?.status === 403) {
        const errorMessage = (error.response.data as { error: string[] })?.error[0];
        addToast(errorMessage, 'error', 1500);
      }
      setSentryLogging(error);
    },
  });

  return { mutate, isSuccess };
};

export default useLogin;
