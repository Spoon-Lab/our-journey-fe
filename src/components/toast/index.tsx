import type { Dispatch } from 'react';
import { useEffect } from 'react';

import s from './style.module.scss';

interface ToastProps {
  message: string;
  position: 'top' | 'bottom';
  setToast: Dispatch<React.SetStateAction<boolean>>;
}

export default function Toast({ message, setToast, position = 'bottom' }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div className={`${s.toastContainer} ${position === 'top' ? s.toastTop : s.toastBottom}`}>
      <p>{message}</p>
    </div>
  );
}
