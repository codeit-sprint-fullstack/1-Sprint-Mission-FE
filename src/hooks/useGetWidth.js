import { useState, useEffect } from "react";

export const useGetWidth = () => {
  const [width, setWindowWidthSize] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidthSize(window.innerWidth);
      // console.log(`window.innerWidth: ${window.innerWidth}`);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
};

export const useGetProductCount = (width) => {
  const [productCount, setProductCount] = useState({ best: 4, selling: 10 });

  useEffect(() => {
    if (width > 1024) {
      productCount != { best: 4, selling: 10 } &&
      setProductCount({ best: 4, selling: 10 });
    } else if (width <= 1024 && width > 800) {
      productCount != { best: 3, selling: 8 } &&
      setProductCount({ best: 3, selling: 8 });
    } else if (width <= 800 && width > 500) {
      productCount != { best: 2, selling: 6 } &&
      setProductCount({ best: 2, selling: 6 });
    } else if (width <= 500) {
      productCount != { best: 1, selling: 4 } &&
      setProductCount({ best: 1, selling: 4 });
    }
  }, [width]);
};
