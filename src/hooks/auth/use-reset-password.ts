import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { useRouter } from 'next/router';

import { API_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/router';

interface ResetPasswordProps {
  new_password1: string;
  new_password2: string;
  token: string;
  uid64: string;
}

const resetPassword = async ({ uid64, token, new_password1, new_password2 }: ResetPasswordProps) => {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}${API_PATHS.AUTH.PASSWORD.CHANGE.POST(uid64, token)}`, {
    new_password1,
    new_password2,
  });

  return res;
};

const useResetPassword = () => {
  const router = useRouter();
  const [toast, setToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const { mutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: async () => {
      await router.push(ROUTES.login);
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        const errorMessage = (error.response.data as { error: string })?.error;
        setToastMessage(errorMessage);
        setToast(true);
      }
    },
  });

  return { mutate, toast, toastMessage, setToast };
};

export default useResetPassword;
