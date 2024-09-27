import { useParallax } from '@/hooks/use-parallax';

import ImageWithFallback from '../image-with-feedback';

interface ParallaxImageProps {
  alt?: string;
  src: string;
}

export default function ParallaxImage({ src, alt = 'parallax-image' }: ParallaxImageProps) {
  const parallaxRef = useParallax();
  return <ImageWithFallback src={src} alt={alt} layout="fill" objectFit="cover" ref={parallaxRef} fallbackText="현재 이미지에 문제가 있습니다" />;
}
