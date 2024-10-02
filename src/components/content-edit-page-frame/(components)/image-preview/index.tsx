import React from 'react';
import Image from 'next/image';

import s from './style.module.scss';

interface ImagePreviewProps {
  imageFile: File | string;
}

export default function ImagePreview({ imageFile }: ImagePreviewProps) {
  console.log(imageFile);
  console.log(typeof imageFile);

  if (typeof imageFile === 'string') {
    return (
      <div className={s.imagePreview}>
        <Image src={imageFile} alt="이미지 미리보기" layout="fill" objectFit="cover" />
      </div>
    );
  }
  const previewUrl = URL.createObjectURL(imageFile);
  return (
    <div className={s.imagePreview}>
      <Image src={previewUrl} alt="이미지 미리보기" layout="fill" objectFit="cover" />
    </div>
  );
}
