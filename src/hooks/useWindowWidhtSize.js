import { useState, useEffect } from 'react';

const useWindowWidhtSize = () => {
  const [windowWidhth, setWindowWidthSize] = useState(window.innerWidth);

  const [bestProductCount, setBestProductCount] = useState(4);
  const [sellingProductCount, setSellingProductCount] = useState(10);

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

  useEffect(() => {
    if (windowWidhth > 800) {
      setSellingProductCount(10);
      setBestProductCount(4);
    } else if (windowWidhth <= 800 && windowWidhth > 400) {
      setSellingProductCount(6);
      setBestProductCount(2);
    } else if (windowWidhth <= 400) {
      setSellingProductCount(4);
      setBestProductCount(1);
    }
  }, [windowWidhth]);



  return { bestProductCount, sellingProductCount };
  // return windowWidhth;
};

export default useWindowWidhtSize;
