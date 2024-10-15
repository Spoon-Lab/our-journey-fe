import React, { useCallback, useEffect, useState } from 'react';

import { usePortal } from '@/hooks/contents/ui/use-portal';

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

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  return portal(
    isVisible && (
      <>
        <div className={s.modalContent} onClick={handleClick}>
          {children}
        </div>
        <div className={s.dimmer} onClick={onClose} />
      </>
    ),
  );
}
