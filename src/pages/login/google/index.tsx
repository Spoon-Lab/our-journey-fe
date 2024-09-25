import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import type { LoginResponse } from '@/types/auth';
import { API_PATHS } from '@/constants/api';
import { ROUTES } from '@/constants/router';

import axiosAuthInstance from '@/libs/auth-axios';

import AuthLayout from '@/components/layouts/auth-layout';
import LottieLoading from '@/components/lottie-loading';

export default function GoogleLogin() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const login = async () => {
      if (session?.user.id_token) {
        try {
          const { data } = await axiosAuthInstance.post<LoginResponse>(`${API_PATHS.AUTH.GOOGLE_CALLBACK.POST()}`, {
            id_token: session?.user.id_token,
          });

          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);

          await router.push(ROUTES.main);
        } catch (error) {
          await router.push(ROUTES.base);
        }
      }
    };

    void login();
  }, [session, router]);

  return <LottieLoading />;
}

GoogleLogin.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
