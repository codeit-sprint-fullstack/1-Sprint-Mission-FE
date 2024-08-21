import { useState, useEffect } from "react";

const useWindowWidhtSize = () => {
  const [windowWidhth, setWindowWidthSize] = useState(window.innerWidth);

  const [bestProductCount, setBestProductCount] = useState(4);
  const [sellingProductCount, setSellingProductCount] = useState(10);
  const [sellingProductCountPerRow, setSellingProductCountPerRow] = useState(5);

  const [device, setDevice] = useState("PC");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidthSize(window.innerWidth);
      console.log(`window.innerWidth: ${window.innerWidth}`);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidhth > 745) {
      setSellingProductCount(10);
      setSellingProductCountPerRow(5)
      setBestProductCount(4);
      setDevice("PC")
    } else if (windowWidhth <= 744 && windowWidhth > 375) {
      setSellingProductCount(6);
      setSellingProductCountPerRow(3)
      setBestProductCount(2);
      setDevice("Tablet")
    } else if (windowWidhth <= 375) {
      setSellingProductCount(4);
      setSellingProductCountPerRow(2)
      setBestProductCount(1);
      setDevice("Mobile")
    }
    console.log(device)
  }, [windowWidhth]);


  return { bestProductCount, sellingProductCount, sellingProductCountPerRow, device };

};

export default useWindowWidhtSize;