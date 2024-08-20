import { useEffect, useState } from "react";

import getApiData from "../api/getApiData.js";

import search from "../images/icon/ic_search.svg";

const useProductData = (deviceType, initialPage, sortOption, keyword) => {
  const [productsList, setProductsList] = useState([]);
  const [nowPage, setNowPage] = useState(initialPage);
  const [totalPageSize, setTotalPageSize] = useState(1);

  let productCountPerRow = 10;

  switch (deviceType) {
    case "PC":
      productCountPerRow = 10;
    case "Tablet":
      productCountPerRow = 8;
    case "Mobile":
      productCountPerRow = 6;
  }

  useEffect(() => {
    getApiData(nowPage, productCount, sortOption, keyword)
      .then((data) => {
        setTotalPageSize(Math.ceil(data.totalCount / productCount));
        if (data.list.length < productCount) {
          setProductsList([
            ...data.list,
            ...Array(productCount - data.list.length).fill({
              images: [search],
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
  }, [deviceType, nowPage, sortOption, keyword]);

  const handlePageChange = (page) => {
    setNowPage(page);
  };

  return { nowPage, productsList, totalPageSize, handlePageChange };
};
export default useProductData;
