import React from 'react';
import Image from 'next/image';

import s from './style.module.scss';

interface ImagePreviewProps {
  imageFile: File;
}

export default function ImagePreview({ imageFile }: ImagePreviewProps) {
  const previewUrl = URL.createObjectURL(imageFile);
  return (
    <div className={s.imagePreview}>
      <Image src={previewUrl} alt="이미지 미리보기" layout="fill" objectFit="cover" />
    </div>
  );
}
