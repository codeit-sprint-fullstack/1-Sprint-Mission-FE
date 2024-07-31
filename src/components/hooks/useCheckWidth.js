import { useState, useEffect } from "react";

function useCheckWidth() {
  const getDeviceType = () => {
    if (375 <= window.innerWidth && window.innerWidth < 744) {
      /* ===== Mobile-width : 375px ~ 743px ====== */
      return 2;
    } else if (744 <= window.innerWidth && window.innerWidth < 1200) {
      /* ===== Tablet - width : 744px ~ 1199px ===== */
      return 1;
    } else {
      /* ===== PC - width : 1200px ~ ===== */
      return 0;
    }
  };

  const [device, setDevice] = useState(getDeviceType());

  const handleResize = () => {
    setDevice(getDeviceType());
  };

  useEffect(() => {
    setDevice(getDeviceType());
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [device];
}

export default useCheckWidth;
