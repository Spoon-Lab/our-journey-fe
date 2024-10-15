import Image from 'next/image';

import { useParallax } from '@/hooks/contents/ui/use-parallax';

interface ParallaxImageProps {
  alt?: string;
  src: string;
}

export default function ParallaxImage({ src, alt = 'parallax-image' }: ParallaxImageProps) {
  const parallaxRef = useParallax();
  return <Image src={src} alt={alt} layout="fill" objectFit="cover" ref={parallaxRef} />;
}
