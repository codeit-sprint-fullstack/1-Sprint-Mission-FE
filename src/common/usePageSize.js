// useDeviceType.js
import { useState, useEffect } from "react";

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState(
    getDeviceType(window.innerWidth)
  );

  function getDeviceType(width) {
    if (width < 743) return "mobile";
    if (width < 1199) return "tablet";
    return "desktop";
  }

  useEffect(() => {
    function handleResize() {
      setDeviceType(getDeviceType(window.innerWidth));
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceType;
}
