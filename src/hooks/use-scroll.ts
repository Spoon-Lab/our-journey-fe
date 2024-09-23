import { useEffect, useState } from 'react';

const useScroll = (threshold: number = 370) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY } = window;
      setIsScrolled(scrollY > threshold);

      const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.min((scrollY / totalScrollHeight) * 100, 100);
      setScrollPercent(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { isScrolled, scrollPercent };
};

export default useScroll;
