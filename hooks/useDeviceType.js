import { useState, useEffect } from "react";

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 함
    if (typeof window !== "undefined") {
      const updateDeviceType = () => {
        const width = window.innerWidth;

        if (width < 768) {
          setDeviceType("mobile");
        } else if (width < 1024) {
          setDeviceType("tablet");
        } else {
          setDeviceType("desktop");
        }
      };

      // 초기 설정
      updateDeviceType();

      // 리사이즈 이벤트 리스너 추가
      window.addEventListener("resize", updateDeviceType);

      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      return () => {
        window.removeEventListener("resize", updateDeviceType);
      };
    }
  }, []);

  return deviceType;
}
