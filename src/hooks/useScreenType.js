import { useState, useEffect } from 'react';

const getScreenType = () => {
  const width = window.innerWidth;
  if (width <= 743) {
    return 'mobile';
  } else if (width <= 1199) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

const useScreenType = () => {
  const [screenType, setScreenType] = useState(getScreenType());

  useEffect(() => {
    const handleResize = () => {
      setScreenType(getScreenType());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenType;
};

export default useScreenType;

