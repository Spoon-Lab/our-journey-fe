import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import type { Signup } from '@/types/auth';
import { API_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/router';

import axiosAuthInstance from '@/libs/auth-axios';

const signup = async ({ email, password1, password2 }: Signup) => {
  const res = await axiosAuthInstance.post(`${API_PATHS.AUTH.SIGNUP.POST()}`, { email, password1, password2 });

  return res;
};

const useSignup = () => {
  const router = useRouter();
  const [toast, setToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setToastMessage('확인 이메일을 발송했습니다');
      setToast(true);

      setTimeout(() => {
        setToast(false);
        void router.push(ROUTES.login);
      }, 1200);
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        const errorMessage = (error.response.data as { error: string })?.error;
        setToastMessage(errorMessage);
        setToast(true);
      }
    },
  });

  return { mutate, toast, setToast, toastMessage, isSuccess, isPending };
};

export default useSignup;
