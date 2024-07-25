import { debounce } from "lodash";
import { useEffect } from "react";

const useWindowSize = (onChange, viewChange, onBestChange) => {
  const dataPaging = (view) => {
    switch (view) {
      case "Desktop":
        viewChange("Desktop");
        onChange("pagesize", 10);
        onBestChange("pagesize", 4);
        break;
      case "isTablet":
        viewChange("isTablet");
        onChange("pagesize", 6);
        onBestChange("pagesize", 2);
        break;
      case "isMobile":
        viewChange("isMobile");
        onChange("pagesize", 4);
        onBestChange("pagesize", 1);
        break;
    }
  };

  let view;
  const handleResize = debounce(() => {
    if (window.innerWidth > 1200) {
      view = "Desktop";
    } else if (window.innerWidth <= 1200 && window.innerWidth > 774) {
      view = "isTablet";
    } else if (window.innerWidth <= 774) {
      view = "isMobile";
    }
    dataPaging(view);
  }, 200);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
};

export default useWindowSize;
