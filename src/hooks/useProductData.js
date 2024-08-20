import { useEffect, useState } from "react";
import getApiData from "../api/getApiData.js";
import imgDefualt from "../images/img_default.png";

const useProductData = (initialPage, productCount, sortOption, keyword) => {
  const [productsList, setProductsList] = useState([]);
  const [noProduct, setNoProduct] = useState(false);
  const [nowPage, setNowPage] = useState(initialPage);
  const [totalPageSize, setTotalPageSize] = useState(1);

  useEffect(() => {
    getApiData(nowPage, productCount, sortOption, keyword)
      .then((data) => {
        setTotalPageSize(Math.ceil(data.totalCount / productCount));

        if (data.list.length === 0) {
          setNoProduct(true);
        } else if (data.list.length < productCount) {
          const newDataList = [
            ...data.list,
            ...Array(productCount - data.list.length).fill({
              images: [imgDefualt],
              name: "",
              description: "",
              price: 0,
              favoriteCount: 0,
            }),
          ];
          setProductsList(newDataList);
          setNoProduct(false);
        } else {
          setProductsList(data.list);
          setNoProduct(false);
        }
      })
      .catch((error) => console.error(error))

  }, [nowPage, productCount, sortOption, keyword]);

  const handlePageChange = (page) => {
    setNowPage(page);
  };

  return { productsList, noProduct, nowPage, totalPageSize, handlePageChange };
};
export default useProductData;