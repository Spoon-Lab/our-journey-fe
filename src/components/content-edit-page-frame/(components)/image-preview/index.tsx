import React from 'react';
import Image from 'next/image';

import s from './style.module.scss';

interface ImagePreviewProps {
  src: string;
}

export default function ImagePreview({ src }: ImagePreviewProps) {
  return (
    <div className={s.imagePreview}>
      <Image src={src} alt="이미지 미리보기" layout="fill" objectFit="cover" />
    </div>
  );
}
