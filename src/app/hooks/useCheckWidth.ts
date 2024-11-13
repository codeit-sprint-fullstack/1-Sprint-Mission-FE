import { useState, useEffect } from "react";
import { PC, ta, mo } from "../constants/device";

function useCheckWidth() {
  const getDeviceType = () => {
    if (typeof window !== "undefined") {
      if (375 <= window.innerWidth && window.innerWidth < 744) {
        /* ===== mo-width : 375px ~ 743px ====== */
        return mo;
      } else if (744 <= window.innerWidth && window.innerWidth < 1200) {
        /* ===== ta - width : 744px ~ 1199px ===== */
        return ta;
      } else {
        /* ===== PC - width : 1200px ~ ===== */
        return PC;
      }
    } else {
      return 0;
    }
  };

  const [device, setDevice] = useState<number>(getDeviceType());

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
  }, [handleResize]);

  return device;
}

export default useCheckWidth;
