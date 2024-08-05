import { useState, useEffect } from "react";

function usePageSize(mobileSize, tabletSize, desktopSize) {
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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return pageSize;
}

export default usePageSize;
