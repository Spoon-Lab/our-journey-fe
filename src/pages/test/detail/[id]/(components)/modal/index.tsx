import { useEffect, useState } from 'react';

import { usePortal } from '@/hooks/use-portal';

import s from './style.module.scss';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const portal = usePortal('modal-root');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return portal(
    isVisible && (
      <>
        <div className={s.dimmer} onClick={onClose} />
        <div className={s.modalContent}>{children}</div>
      </>
    ),
  );
}
