import { useState, useEffect } from "react";

function useResize(mobileSize, tabletSize, desktopSize) {
  const [pageSize, setPageSize] = useState(desktopSize);

  function getPageSize() {
    if (window.innerWidth < 744) {
      return mobileSize;
    } else if (window.innerWidth < 1200) {
      return tabletSize;
    } else return desktopSize;
  }

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    handleResize();

    window.onresize = handleResize;

    return () => {
      window.onresize = null;
    };
  }, []);

  return pageSize;
}

export default useResize;
