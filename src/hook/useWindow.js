import { useState, useEffect } from 'react';

// const mobileSize = window.matchMedia('(max-width: 773px)').matches;
// const tabletSize = window.matchMedia('(max-width: 1200px)').matches;

const useMediaType = () => {
  const [mediaType, setMediaType] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.outerWidth;

      if (773 >= width) {
        setMediaType('mobile');
      } else if (1200 >= width) {
        setMediaType('tablet');
      } else {
        setMediaType('pc');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return mediaType;
};

export default useMediaType;
