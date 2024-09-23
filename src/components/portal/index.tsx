import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ModalPortal({ children }: { children: ReactElement }) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined') return null;

  return mounted ? createPortal(children, document.getElementById('modal') as HTMLElement) : null;
}
