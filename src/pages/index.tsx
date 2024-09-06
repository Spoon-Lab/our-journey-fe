import type { ReactNode } from 'react';

import DefaultLayout from '@/components/layouts';

export default function Home() {
  return <main>Hello World!</main>;
}

Home.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
