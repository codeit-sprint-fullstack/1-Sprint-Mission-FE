import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

const useImgResize = () => {
  const [checkView, setCheckView] = useState();

  const handleResize = useDebounce(() => {
    if (window.innerWidth >= 1200) {
      setCheckView("Desktop");
    } else if (window.innerWidth < 1200 && window.innerWidth >= 775) {
      setCheckView("isTablet");
    } else if (window.innerWidth <= 774) {
      setCheckView("isMobile");
    }
  }, 150);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return checkView;
};

export default useImgResize;
