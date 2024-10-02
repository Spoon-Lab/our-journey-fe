import React, { memo } from 'react';
import Image from 'next/image';

import s from './style.module.scss';

interface ImagePreviewProps {
  imageFile: File | string;
}

const ImagePreview = memo(
  ({ imageFile }: ImagePreviewProps) => {
    const imageUrl = typeof imageFile === 'string' ? imageFile : URL.createObjectURL(imageFile);

    return (
      <div className={s.imagePreview}>
        <Image src={imageUrl} alt="이미지 미리보기" layout="fill" objectFit="cover" />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.imageFile === nextProps.imageFile,
);

ImagePreview.displayName = 'ImagePreview';

export default ImagePreview;
