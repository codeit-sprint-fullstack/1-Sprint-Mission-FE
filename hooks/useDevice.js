import { useState, useEffect } from 'react';

export default function useDevice({ articles }) {
  const [bestArticles, setBestArticles] = useState(articles);
  const [resize, setResize] = useState();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setResize(screenWidth);

      let maxArticles;

      if (screenWidth <= 743) {
        maxArticles = 1;
      } else if (screenWidth <= 1199) {
        maxArticles = 2;
      } else {
        maxArticles = 3;
      }
      setBestArticles(articles.slice(0, maxArticles));
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [articles]);

  return { bestArticles };
}
