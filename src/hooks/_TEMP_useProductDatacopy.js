import { useEffect, useState } from "react";

import getApiData from "../api/getProductsData.js";

import search from "../images/icon/ic_search.svg";

import axios from "axios";

const URL = "https://panda-market-api.vercel.app";

export async function getProductList(page, pageSize, orderBy, keyword) {
  try {
    const response = await axios.get(`${URL}/products`, {
      params: { page, pageSize, orderBy, keyword },
    });
    console.log("api 호출")
    return response.data;
  } catch (error) {
    console.error("Fail Get Product List: ", error);
    throw error;
  }
}
export default getProductList;


const useProductData = (nowPage, showProductCount, orderBy, keyword) => {
  const [getProductList, setProductsList] = useState([]);

  useEffect(() => {
    getApiData(nowPage, showProductCount, orderBy, keyword)
      .then((data) => {
        // data 정보 콘솔 로그
        console.log(`data.list.length: ${data.list.length}`);
        // 상품 데이터 확인
        if (data.list.length < showProductCount) {
          // 상품이 보여줄 갯수보다 적으면 가데이터로 채우기
          const newFiiledDataList = [
            ...data.list,
            ...Array(showProductCount - data.list.length).fill({
              images: [search],
              name: "",
              description: "",
              price: 0,
              favoriteCount: 0,
            }),
          ];
          setProductsList(newFiiledDataList);
        } else {
          setProductsList(data.list); // 이상 없으면 getProductList 채우기
        }
      })
      .catch((error) => console.error(error));
  }, [nowPage, showProductCount, orderBy, keyword]);

  return getProductList;
};
export default useProductData;
