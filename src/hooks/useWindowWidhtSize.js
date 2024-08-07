import { useState, useEffect } from 'react';

const useWindowWidhtSize = () => {
  const [windowWidhth, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowWidhth;
};

export default useWindowWidhtSize;
