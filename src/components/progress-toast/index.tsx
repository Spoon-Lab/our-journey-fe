import { useEffect, useState } from 'react';

import s from './style.module.scss';

interface ToastProps {
  duration: number;
  id: number;
  message: string;
  onClose: (id: number) => void;
  type: 'success' | 'error' | 'info' | 'warning';
}

export default function Toast({ id, message, type, duration = 1000, onClose }: ToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev > 0) return prev - 100 / (duration / 100);
        clearInterval(interval);
        onClose(id);
        return 0;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, id, onClose]);

  const handleClose = () => {
    onClose(id);
  };
  const backgroundColor = (() => {
    switch (type) {
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      case 'info':
        return 'blue';
      case 'warning':
        return 'orange';
      default:
        return 'gray';
    }
  })();

  return (
    <div
      onClick={handleClose}
      className={s.toast}
      style={{
        backgroundColor,
        color: 'white',
        cursor: 'pointer',
        width: '250px',
      }}
    >
      {message}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
