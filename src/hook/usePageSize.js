import { useState, useEffect } from 'react';

const usePageSize = (defaultSize, tabletSize, mobileSize) => {
  const [pageSize, setPageSize] = useState(defaultSize);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 743) {
        setPageSize(mobileSize);
      } else if (window.innerWidth <= 1199) {
        setPageSize(tabletSize);
      } else {
        setPageSize(defaultSize);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [defaultSize, tabletSize, mobileSize]);

  return pageSize;
};

export default usePageSize;
