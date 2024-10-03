import React from 'react';
import Image from 'next/image';

import Modal from '../modal';

import s from './style.module.scss';

import { CloseIcon } from '@/assets/icons';

interface ImageZoomedModalProps {
  imageSrc: string;
  onClose: () => void;
}

export default function ImageZoomedModal({ imageSrc, onClose }: ImageZoomedModalProps) {
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={s.imageContainer} onClick={onClose}>
        <button type="button" onClick={handleCloseClick} className={s.closeButton}>
          <CloseIcon />
        </button>
        <div className={s.imageWrapper} onClick={handleImageClick}>
          <Image src={imageSrc} alt="Zoomed Image" layout="fill" objectFit="contain" className={s.zoomableImage} />
        </div>
      </div>
    </Modal>
  );
}
