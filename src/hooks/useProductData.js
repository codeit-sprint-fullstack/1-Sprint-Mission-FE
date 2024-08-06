import { useEffect, useState } from "react";

import getApiData from "../api/getProductsData.js";

import search from "../images/icon/ic_search.svg";


const useProductData = (nowPage, showProductCount, orderBy, keyword) => {

  const [getProductList, setProductsList] = useState([]);
  const [totalPageSize, setTotalPageSize] = useState(1);

  useEffect(() => {
    getApiData (nowPage, showProductCount, orderBy, keyword)
      .then((data) => {
        // 상품 최대 개수 확인
        console.log(`data.totalCount: ${data.totalCount}`);
        // 최대 페이지 계산
        const maxPageCalc = Math.ceil(data.totalCount / showProductCount);
        setTotalPageSize(maxPageCalc);

        // data 정보 콘솔 로그
        console.log(`data.list.length: ${data.list.length}`);
        // 상품 데이터 확인
        if (data.list.length < showProductCount) { // 상품이 보여줄 갯수보다 적으면 가데이터로 채우기
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

  return {
    getProductList,
    totalPageSize
  }

}
export default useProductData;