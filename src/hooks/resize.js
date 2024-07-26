import { debounce } from "lodash";
import { useEffect } from "react";

const useWindowSize = (onChange, viewChange, onBestChange, view) => {
  const dataPaging = (nextView) => {
    switch (nextView) {
      case "Desktop":
        viewChange("Desktop");
        onChange({ pagesize: 10, page: 1 });
        onBestChange("pagesize", 4);
        break;
      case "isTablet":
        viewChange("isTablet");
        onChange({ pagesize: 6, page: 1 });
        onBestChange("pagesize", 2);
        break;
      case "isMobile":
        viewChange("isMobile");
        onChange({ pagesize: 4, page: 1 });
        onBestChange("pagesize", 1);
        break;
    }
  };

  const handleResize = debounce(() => {
    let checkView;
    if (window.innerWidth >= 1200) {
      checkView = "Desktop";
    } else if (window.innerWidth < 1200 && window.innerWidth > 774) {
      checkView = "isTablet";
    } else if (window.innerWidth <= 774) {
      checkView = "isMobile";
    }
    dataPaging(checkView);
  }, 200);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
};

export default useWindowSize;
