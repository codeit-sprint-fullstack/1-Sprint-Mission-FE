import { useEffect, useState } from "react";

import getApiData from "../api/getProductsData.js";

import search from "../images/icon/ic_search.svg";

const URL = "https://panda-market-api.vercel.app";

const useProductData = (nowPage, productCount, sortOption, keyword) => {
  const [productsList, setProductsList] = useState([]);
  const [noProduct, setNoProduct] = useState(false);

  const productData = new Array();

  useEffect(() => {
    getApiData(nowPage, productCount, sortOption, keyword)
      .then((data) => {
        if (data.list.length === 0) {
          setNoProduct(true);
        } else if (data.list.length < productCount) {
          const newDataList = [
            ...data.list,
            ...Array(productCount - data.list.length).fill({
              images: [search],
              name: "",
              description: "",
              price: 0,
              favoriteCount: 0,
            }),
          ];
          setProductsList(newDataList);
        } else {
          setProductsList(data.list);
        }
      })
      .catch((error) => console.error(error));
  }, [nowPage, productCount, sortOption, keyword]);

  return { productsList, noProduct };
};
export default useProductData;
