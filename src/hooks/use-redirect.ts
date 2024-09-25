'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useRedirect() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return useCallback(
    (path: string) => {
      if (isClient) {
        router.push(path);
      }
    },
    [router, isClient],
  );
}

// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// type Condition = boolean | (() => boolean);

// export function useConditionalRedirect(condition: Condition, redirectPath: string) {
//   const router = useRouter();

//   useEffect(() => {
//     const shouldRedirect = typeof condition === 'function' ? condition() : condition;

//     if (shouldRedirect) {
//       router.push(redirectPath);
//     }
//   }, [condition, redirectPath, router]);
// }
