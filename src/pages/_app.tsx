import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import ReactQueryProvider from '@/components/providers/ReactQuery';

import '@/styles/globals.scss';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return <ReactQueryProvider>{getLayout(<Component {...pageProps} />)}</ReactQueryProvider>;
}
