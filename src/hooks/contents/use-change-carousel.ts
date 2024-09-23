import { useEffect, useRef, useState } from 'react';

import type { Carousel } from '@/pages/main/component/banner-carousel';

export const useChangeCarousel = (carouselData: Carousel[]) => {
  const [currentId, setCurrentId] = useState(carouselData ? carouselData[0].bannerId : '');
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentOrder = carouselData.findIndex((item) => item.bannerId === currentId);
      const nextOrder = (currentOrder + 1) % carouselData.length;
      const nextBannerId = carouselData[nextOrder].bannerId;

      if (carouselContainerRef.current) {
        const nextCard = carouselContainerRef.current.children[nextOrder];
        if (nextCard) {
          carouselContainerRef.current.scrollTo({
            left: (nextCard as HTMLElement).offsetLeft,
            behavior: 'smooth',
          });
        }
      }

      setCurrentId(nextBannerId);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentId, carouselData]);

  return { currentId, carouselContainerRef };
};
