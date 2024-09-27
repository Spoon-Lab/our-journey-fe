import { forwardRef, useState } from 'react';
import type { ImageProps } from 'next/image';
import Image from 'next/image';

import s from './style.module.scss';

interface ImageWithFallbackProps extends ImageProps {
  fallbackText?: string;
}

const ImageWithFallback = forwardRef<HTMLDivElement, ImageWithFallbackProps>(({ src, alt, fallbackText = '현재 이미지에 문제가 있습니다', ...props }, ref) => {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  return (
    <div ref={ref} className={s.imageWrapper}>
      {imageError ? (
        <div className={s.feedback}>{fallbackText}</div>
      ) : (
        <Image
          {...props}
          src={src}
          alt={alt}
          onLoadingComplete={(result) => {
            if (result.naturalWidth === 0) {
              handleError();
            }
          }}
          onError={handleError}
        />
      )}
    </div>
  );
});

ImageWithFallback.displayName = 'ImageWithFallback';
export default ImageWithFallback;
