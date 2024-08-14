import { debounce } from "lodash";
import { useEffect } from "react";

const useWindowSize = (onChange, onBestChange, onChangeView) => {
  const dataPaging = (nextView) => {
    switch (nextView) {
      case "Desktop":
        onChangeView("Desktop");
        onChange({ pageSize: 10, page: 1 });
        onBestChange("pageSize", 4);
        break;
      case "isTablet":
        onChangeView("isTablet");
        onChange({ pageSize: 6, page: 1 });
        onBestChange("pageSize", 2);
        break;
      case "isMobile":
        onChangeView("isMobile");
        onChange({ pageSize: 4, page: 1 });
        onBestChange("pageSize", 1);
        break;
      default:
    }
  };

  const handleResize = debounce(() => {
    let checkView;
    if (window.innerWidth >= 1200) {
      checkView = "Desktop";
    } else if (window.innerWidth < 1200 && window.innerWidth >= 775) {
      checkView = "isTablet";
    } else if (window.innerWidth <= 774) {
      checkView = "isMobile";
    }
    dataPaging(checkView);
  }, 150);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
};

export default useWindowSize;
