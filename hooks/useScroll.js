import { useState, useEffect } from 'react';

export default function useScroll({ comment, loading, hasMore }) {
  const [canScroll, setCanScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100 && !canScroll) {
        setCanScroll(true);
      } else {
        setCanScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore, canScroll, comment]);

  return { canScroll };
}
