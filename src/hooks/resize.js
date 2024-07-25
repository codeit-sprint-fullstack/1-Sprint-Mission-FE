import { debounce } from "lodash";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const useWindowSize = (onChange) => {
  let view;
  const handleResize = debounce(() => {
    if (window.innerWidth > 1200) {
      view = "Desktop";
    } else if (window.innerWidth <= 1200 && window.innerWidth > 774) {
      view = "isTablet";
    } else if (window.innerWidth <= 774) {
      view = "isMobile";
    }
    onChange(view);
  }, 200);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
};

export default useWindowSize;
