import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

import { API_PATHS, BASE_URL } from '@/constants/api';
import { ROUTES } from '@/constants/router';

const requestEmail = async ({ email }: { email: string }) => {
  const res = await axios.post(`${BASE_URL}${API_PATHS.AUTH.PASSWORD.RESET.POST()}`, {
    email,
  });

  return res;
};

const useEmailRequest = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: requestEmail,
    onSuccess: async () => {
      await router.push(ROUTES.email);
    },
  });
};

export default useEmailRequest;
