import type { AppProps } from 'next/app';

import GlobalLayout from '@/components/layouts';
import ReactQueryProvider from '@/components/providers/ReactQuery';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </ReactQueryProvider>
  );
}
