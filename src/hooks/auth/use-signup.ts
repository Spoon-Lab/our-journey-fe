import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { useRouter } from 'next/router';

import type { Signup } from '@/types/auth';
import { API_PATHS, BASE_URL } from '@/constants/api';
import { ROUTES } from '@/constants/router';

interface ErrorMessageProps {
  email?: string;
  password1?: string;
}

const signup = async ({ email, password1, password2 }: Signup) => {
  const res = await axios.post(`${BASE_URL}${API_PATHS.AUTH.SIGNUP.POST()}`, { email, password1, password2 });

  return res;
};

const useSignup = () => {
  const router = useRouter();
  const [toast, setToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const { mutate, isSuccess } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setToastMessage('확인 이메일을 발송했습니다');
      setToast(true);

      setTimeout(() => {
        setToast(false);
        void router.push(ROUTES.login);
      }, 1200);
    },
    onError: (error: AxiosError<ErrorMessageProps>) => {
      if (error?.response?.data?.email) {
        setToastMessage(error?.response?.data?.email);
        setToast(true);
      } else if (error?.response?.data?.password1) {
        setToastMessage(error?.response?.data?.password1);
        setToast(true);
      }
    },
  });

  return { mutate, toast, setToast, toastMessage, isSuccess };
};

export default useSignup;
