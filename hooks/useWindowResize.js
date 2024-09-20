import { useEffect, useState } from "react";

const useWindowResize = () => {
  const [nextView, setNextView] = useState("isDesktop");

  const handleResize = () => {
    if (window.innerWidth >= 1200) {
      setNextView("isDesktop");
    } else if (window.innerWidth < 1200 && window.innerWidth >= 775) {
      setNextView("isTablet");
    } else if (window.innerWidth <= 774) {
      setNextView("isMobile");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return nextView;
};

export default useWindowResize;
