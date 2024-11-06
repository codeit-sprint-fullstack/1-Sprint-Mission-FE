import { useState, useEffect } from "react";

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateDeviceType = () => {
        const width = window.innerWidth;

        if (width < 744) {
          setDeviceType("mobile");
        } else if (width < 1200) {
          setDeviceType("tablet");
        } else {
          setDeviceType("desktop");
        }
      };

      updateDeviceType();

      window.addEventListener("resize", updateDeviceType);

      return () => {
        window.removeEventListener("resize", updateDeviceType);
      };
    }
  }, []);

  return deviceType;
}
