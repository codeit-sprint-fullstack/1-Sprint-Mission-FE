import { useState, useEffect } from "react";

function usePageSize(mobileSize, tabletSize, desktopSize) {
  const [limit, setLimit] = useState(desktopSize);

  function getPageSize() {
    if (window.innerWidth < 744) {
      return mobileSize;
    } else if (window.innerWidth < 1200) {
      return tabletSize;
    } else return desktopSize;
  }

  useEffect(() => {
    const handleResize = () => {
      setLimit(getPageSize());
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return limit;
}

export default usePageSize;
