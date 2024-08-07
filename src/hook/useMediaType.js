import { useState, useEffect } from 'react';

const useMediaType = () => {
  const [mediaType, setMediaType] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const mobileSize = window.matchMedia('(max-width: 773px)').matches;
      const tabletSize = window.matchMedia('(max-width: 1200px)').matches;

      if (mobileSize) {
        setMediaType('mobile');
      } else if (tabletSize) {
        setMediaType('tablet');
      } else {
        setMediaType('pc');
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return mediaType;
};

export default useMediaType;
