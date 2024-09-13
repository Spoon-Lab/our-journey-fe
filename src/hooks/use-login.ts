import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  email: string;
}

const login = async ({ email, password }: LoginData): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>('https://z7wukbztzj.execute-api.ap-northeast-2.amazonaws.com/staging/auth/login', { email, password });

  console.log(data);

  return data;
};

const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await router.push('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useLogin;
