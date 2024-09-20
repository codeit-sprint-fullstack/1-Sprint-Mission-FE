import { useState, useEffect } from "react";
import { PC, TABLET, MOBILE } from "../constants/device";

function useCheckWidth() {
  const getDeviceType = () => {
    if (typeof window !== "undefined") {
      if (375 <= window.innerWidth && window.innerWidth < 744) {
        /* ===== Mobile-width : 375px ~ 743px ====== */
        return MOBILE;
      } else if (744 <= window.innerWidth && window.innerWidth < 1200) {
        /* ===== Tablet - width : 744px ~ 1199px ===== */
        return TABLET;
      } else {
        /* ===== PC - width : 1200px ~ ===== */
        return PC;
      }
    } else {
      return 0;
    }
  };

  const [device, setDevice] = useState(getDeviceType());

  const handleResize = () => {
    setDevice(getDeviceType());
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDevice(getDeviceType());
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return device;
}

export default useCheckWidth;
