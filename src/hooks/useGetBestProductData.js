import { useEffect, useState } from "react";
import getApiData from "../api/getApiData.js";
import imgDefualt from "../images/img_default.png";

const useProductData = (deviceType) => {
  const [productsList, setProductsList] = useState([]);

  let productCountPerRow = 4;

  switch (deviceType) {
    case "PC":
      productCountPerRow = 3;
    case "Tablet":
      productCountPerRow = 2;
    case "Mobile":
      productCountPerRow = 1;
  }

  useEffect(() => {
    getApiData(nowPage, productCount, sortOption, keyword)
      .then((data) => {
        if (data.list.length < productCount) {
          setProductsList([
            ...data.list,
            ...Array(productCount - data.list.length).fill({
              images: [imgDefualt],
              name: "",
              description: "",
              price: 0,
              favoriteCount: 0,
            }),
          ]);
        } else {
          setProductsList(data.list);
        }
      })
      .catch((error) => console.error(error));
  }, [deviceType]);

  return { nowPage, productsList, totalPageSize, handlePageChange };
};
export default useProductData;
