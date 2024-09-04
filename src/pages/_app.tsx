import type { AppProps } from 'next/app';

import ReactQueryProvider from '@/components/providers/ReactQuery';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
    </ReactQueryProvider>
  );
}
