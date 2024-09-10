import { useState, useEffect } from "react";

const useGetProductCount = () => {
  const [productCount, setProductCount] = useState({ best: 4, selling: 10 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024 && window.innerWidth > 800) {
        setProductCount({ best: 3, selling: 8 });
      } else if (window.innerWidth <= 800 && window.innerWidth > 500) {
        setProductCount({ best: 2, selling: 6 });
      } else if (window.innerWidth <= 500) {
        setProductCount({ best: 1, selling: 4 });
      } else {
        setProductCount({ best: 4, selling: 10 });
      }
    };

    console.log(productCount)
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return productCount;
};

export default useGetProductCount;
