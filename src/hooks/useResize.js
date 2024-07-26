import { useState, useEffect } from "react";

function useResize() {
  const [pageSize, setPageSize] = useState(4);

  function getPageSize() {
    if (window.innerWidth < 744) {
      return 1;
    } else if (window.innerWidth < 1200) {
      return 2;
    } else return 4;
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
