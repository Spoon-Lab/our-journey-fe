import type { ReactNode } from 'react';

import DefaultLayout from '@/components/layouts';

export default function TestPage() {
  return (
    <main>
      <h1>Test Page</h1>
    </main>
  );
}

TestPage.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
