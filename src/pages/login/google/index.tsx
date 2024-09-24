import type { ReactNode } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import type { LoginResponse } from '@/types/auth';
import { API_PATHS, BASE_URL } from '@/constants/api';
import { ROUTES } from '@/constants/router';

import AuthLayout from '@/components/layouts/auth-layout';

import s from './style.module.scss';

export default function GoogleLogin() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const login = async () => {
      if (session?.user.id_token) {
        try {
          const { data } = await axios.post<LoginResponse>(`${BASE_URL}${API_PATHS.AUTH.GOOGLE_CALLBACK.POST()}`, {
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

  return (
    <div className={s.container}>
      <p>구글 로그인 중</p>
    </div>
  );
}

GoogleLogin.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
