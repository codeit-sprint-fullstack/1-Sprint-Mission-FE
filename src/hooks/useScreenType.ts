import { useState, useEffect } from "react";

type ScreenType = "mobile" | "tablet" | "desktop";

const getScreenType = (): ScreenType => {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    if (width <= 743) {
      return "mobile";
    } else if (width <= 1199) {
      return "tablet";
    } else {
      return "desktop";
    }
  }
  return "desktop";
};

const useScreenType = (): ScreenType => {
  const [screenType, setScreenType] = useState<ScreenType>("desktop");

  useEffect(() => {
    const handleResize = () => {
      setScreenType(getScreenType());
    };

    if (typeof window !== "undefined") {
      setScreenType(getScreenType()); // 초기 화면 크기 설정
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return screenType;
};

export default useScreenType;

