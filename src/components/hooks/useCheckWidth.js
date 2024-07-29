import { useState, useEffect } from "react";

function useCheckWidth() {
  // index 0 : PC 1 : TABLET 2 : MOBILE
  const [device, setDevice] = useState(0);

  const handleResize = () => {
    if (375 <= window.innerWidth && window.innerWidth < 744) {
      /* ===== Mobile-width : 375px ~ 743px ====== */
      setDevice(2);
    } else if (744 <= window.innerWidth && window.innerWidth < 1200) {
      /* ===== Tablet - width : 744px ~ 1199px ===== */
      setDevice(1);
    } else {
      /* ===== PC - width : 1200px ~ ===== */
      setDevice(0);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [device];
}

export default useCheckWidth;
