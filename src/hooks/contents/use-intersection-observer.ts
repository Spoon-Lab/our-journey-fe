import type { RefObject } from 'react';
import { useCallback, useEffect, useRef } from 'react';

interface IntersectionObserverParams {
  onIntersect: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;
  ref: RefObject<Element>;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

export const useIntersectionObserver = ({ ref, onIntersect, root = null, rootMargin = '0px', threshold = 1.0 }: IntersectionObserverParams) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onIntersect(entry, observer);
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, onIntersect, root, rootMargin, threshold]);
};
