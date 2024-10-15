import { useEffect, useRef } from 'react';

/**
 * useParallax Hook은 스크롤 시 이미지 요소에 파라랄랙스(Parallax) 효과를 적용하는 기능을 제공합니다.
 *
 * @returns {React.RefObject<HTMLImageElement>} - 파라랄랙스 효과를 적용할 이미지 요소에 대한 참조 객체를 반환합니다.
 *
 * @example
 * // 이 훅을 사용하여 이미지에 파라랄랙스 효과 적용하기
 * import Image from 'next/image';
 * import { useParallax } from './hooks/useParallax';
 *
 * const MyComponent = () => {
 *   const imgRef = useParallax();
 *
 *   return (
 *     <Image
 *       ref={imgRef}
 *       src="/path/to/image.jpg"
 *       alt="Parallax Image"
 *       layout="fill"
 *     />
 *   );
 * };
 *
 * @description
 * - 이 훅은 스크롤 이벤트를 감지하고, 이미지에 `translateY`와 `scale` 변환을 적용하여 스크롤에 따라 이미지가 이동하고 확대/축소되는 파라랄랙스 효과를 구현합니다.
 * - 스크롤 이벤트 핸들러는 스크롤 Y축 값을 기반으로 이미지를 아래로 이동시키며, 동시에 이미지 크기를 확대하는 변환을 적용합니다.
 */

export const useParallax = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY } = window;
      const scaleFactor = 1 + scrollY / (1000 * 2);
      const translateY = scrollY * 0.05;

      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${translateY}px) scale(${scaleFactor})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return imgRef;
};
