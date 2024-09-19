import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

import type { Signup } from '@/types/auth';
import { API_PATHS, BASE_URL } from '@/constants/api';
import { ROUTER } from '@/constants/router';

// TODO: 배포된 스웨거에 내용이 아직 없어서 response는 수정 후에 처음 로그인히면 user-info/{pk} 로 이동하는걸로 수정
const signup = async ({ email, password1, password2 }: Signup) => {
  const res = await axios.post(`${BASE_URL}${API_PATHS.AUTH.SIGNUP.POST()}`, { email, password1, password2 });

  return res;
};

const useSignup = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: signup,
    onSuccess: async () => {
      await router.push(ROUTER.login);
    },
    onError: () => {
      // TODO: 토스트메세지로 오류?
    },
  });
};

export default useSignup;
