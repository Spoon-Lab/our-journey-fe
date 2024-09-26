import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

import s from './style.module.scss';

interface ToastProps {
  duration: number;
  id: number;
  message: string;
  onClose: (id: number) => void;
  type: 'success' | 'error' | 'info' | 'warning';
}

export default function Toast({ id, message, type, duration = 1000, onClose }: ToastProps) {
  const controls = useAnimation();

  useEffect(() => {
    void controls.start({
      width: '0%',
      transition: { duration: duration / 1000, ease: 'linear' },
    });

    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [controls, duration, id, onClose]);

  const handleClose = () => {
    onClose(id);
  };

  const toastVariants = {
    initial: { opacity: 0, y: 50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className={s.toast}
      onClick={handleClose}
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {message}
      <motion.div className={s.progressBar} initial={{ width: '100%' }} animate={controls} />
    </motion.div>
  );
}
