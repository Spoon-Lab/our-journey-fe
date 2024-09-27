import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { API_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/router';

import axiosAuthInstance from '@/libs/auth-axios';

import { useToast } from '../use-toast';

const requestEmail = async ({ email }: { email: string }) => {
  const res = await axiosAuthInstance.post(`${API_PATHS.AUTH.PASSWORD.RESET.POST()}`, {
    email,
  });

  return res;
};

const useEmailRequest = () => {
  const router = useRouter();
  const { addToast } = useToast();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: requestEmail,
    onSuccess: async () => {
      await router.push(ROUTES.email);
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        const errorMessage = (error.response.data as { error: string })?.error;
        addToast(errorMessage, 'error', 1500);
      }
    },
  });

  return { mutate, isPending, isSuccess };
};

export default useEmailRequest;
