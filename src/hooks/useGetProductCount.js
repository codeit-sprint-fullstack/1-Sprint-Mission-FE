import { useState, useEffect } from "react";

// const getCountByWidth = (width) => {
//   if (width <= 1024 && width > 800) {
//     return { best: 3, selling: 8 };
//   } else if (width <= 800 && width > 500) {
//     return { best: 2, selling: 6 };
//   } else if (width <= 500) {
//     return { best: 1, selling: 4 };
//   } else {
//     return { best: 4, selling: 10 };
//   }
// };

const getCountByWidth = (width) => {
  console.log(`getCountByWidth 함수 불러옴`)
  if (width <= 1024 && width > 800) {
    return { best: 3, selling: 8 };
  } else if (width <= 800 && width > 500) {
    return { best: 2, selling: 6 };
  } else if (width <= 500) {
    return { best: 1, selling: 4 };
  } else {
    return { best: 4, selling: 10 };
  }
};

const useGetProductCount = () => {
  const [productCount, setProductCount] = useState({});
  
  useEffect(() => {
    setProductCount(getCountByWidth(window.innerWidth));
    const handleResize = () => {
      console.log(`window.innerWidth: ${window.innerWidth}`);
      if (getCountByWidth(window.innerWidth) !== productCount) {
        setProductCount(getCountByWidth(window.innerWidth));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // productCount를 의존성으로 추가

  return productCount;
};

export default useGetProductCount;
