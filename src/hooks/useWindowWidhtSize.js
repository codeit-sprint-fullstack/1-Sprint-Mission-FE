import { useState, useEffect } from 'react';

const useWindowWidhtSize = () => {
  const [windowWidhth, setWindowWidthSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidthSize(window.innerWidth);
      console.log(`window.innerWidth: ${window.innerWidth}`);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return windowWidhth;
};

export default useWindowWidhtSize;
