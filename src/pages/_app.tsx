import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import ReactQueryProvider from '@/components/providers/ReactQuery';
import { ToastProvider } from '@/components/providers/toast-provider';

import '@/styles/globals.scss';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return (
    <ReactQueryProvider>
      <ToastProvider>
        <SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
      </ToastProvider>
    </ReactQueryProvider>
  );
}
