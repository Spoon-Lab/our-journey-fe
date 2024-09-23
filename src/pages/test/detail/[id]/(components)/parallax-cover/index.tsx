import Image from 'next/image';

import { useParallax } from '@/hooks/use-parallax';

import s from './style.module.scss';

interface ParallaxCoverImageProps {
  alt?: string;
  src: string;
}

export default function ParallaxCoverImage({ src, alt = 'cover-image' }: ParallaxCoverImageProps) {
  const parallaxRef = useParallax();

  return (
    <>
      <div className={s.gradientOverlay} />
      <Image className={s.coverImage} src={src} alt={alt} layout="fill" ref={parallaxRef} />
    </>
  );
}
