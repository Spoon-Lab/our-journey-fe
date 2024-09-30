import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { API_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/router';

import axiosAuthInstance from '@/libs/auth-axios';

import { useToast } from '../use-toast';

interface ResetPasswordProps {
  new_password1: string;
  new_password2: string;
  token: string;
  uid64: string;
}

const resetPassword = async ({ uid64, token, new_password1, new_password2 }: ResetPasswordProps) => {
  const res = await axiosAuthInstance.post(`${API_PATHS.AUTH.PASSWORD.CHANGE.POST(uid64, token)}`, {
    new_password1,
    new_password2,
  });

  return res;
};

const useResetPassword = () => {
  const router = useRouter();
  const { addToast } = useToast();

  const { mutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      addToast('비밀번호가 변경되었습니다.', 'info', 2000);
      void router.push(ROUTES.login);
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        const errorMessage = (error.response.data as { error: string })?.error;
        addToast(errorMessage, 'error', 1500);
      }
    },
  });

  return { mutate };
};

export default useResetPassword;
