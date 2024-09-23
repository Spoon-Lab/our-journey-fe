import { useEffect, useRef, useState } from 'react';

export const useActiveScroll = () => {
  const [isScroll, setIsScroll] = useState(false);
  const scrollRef = useRef(false);
  const searchbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !scrollRef.current) {
        scrollRef.current = true;
        if (searchbarRef.current) {
          setIsScroll(true);
        }
      } else if (window.scrollY === 0 && scrollRef.current) {
        scrollRef.current = false;
        if (searchbarRef.current) {
          setIsScroll(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { searchbarRef, isScroll };
};
