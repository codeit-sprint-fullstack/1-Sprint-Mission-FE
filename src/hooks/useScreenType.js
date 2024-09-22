import { useState, useEffect } from "react";

const getScreenType = () => {
  if (typeof window !== "undefined") {
    // 클라이언트 측에서만 window 객체를 사용
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

const useScreenType = () => {
  const [screenType, setScreenType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      setScreenType(getScreenType());
    };

    // 브라우저에서만 실행되도록 조건부로 처리
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
