import Image from 'next/image';

import Modal from '../modal';

import s from './style.module.scss';

interface ImageZoomedModalProps {
  imageSrc: string;
  onClose: () => void;
}

export default function ImageZoomedModal({ imageSrc, onClose }: ImageZoomedModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className={s.imageContainer}>
        <Image src={imageSrc} alt="Zoomed Image" layout="fill" objectFit="contain" />
      </div>
    </Modal>
  );
}
