import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function useScrollProgress({ offset = ['start end', 'end start'] } = {}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return { ref, scrollYProgress };
}

export function useParallax(scrollYProgress, range = [0, -50]) {
  return useTransform(scrollYProgress, [0, 1], range);
}
