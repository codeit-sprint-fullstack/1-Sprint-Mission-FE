import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [nextView, setNextView] = useState("isDesktop");

  const handleResize = useDebounce(() => {
    if (window.innerWidth >= 1200) {
      setNextView("Desktop");
    } else if (window.innerWidth < 1200 && window.innerWidth >= 775) {
      setNextView("isTablet");
    } else if (window.innerWidth <= 774) {
      setNextView("isMobile");
    }
  }, 150);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize;
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return nextView;
};

export default useWindowSize;
