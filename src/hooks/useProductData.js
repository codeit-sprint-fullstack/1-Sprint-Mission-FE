import { useEffect, useState } from "react";

import getApiData from "../api/getProductsData.js";

const URL = "https://panda-market-api.vercel.app";

const getProductData = (page, pageSize, orderBy, keyword, productsCount) => {

  const [getProductsList, setProductsList] = useState([]);
  const [noProduct, setBoolProduct] = useState(false);
  const [totalPageSize, setTotalPageSize] = useState(1);

  useEffect(() => {
    getApiData (page = 1, pageSize = 10, orderBy = 'recent', keyword = '')
      .then((data) => {
        // 상품 최대 개수 확인
        console.log(`data.totalCount: ${data.totalCount}`);
        // 최대 페이지 계산
        const maxPageCalc = Math.ceil(data.totalCount / productsCount);
        setTotalPageSize(maxPageCalc);

        // data 정보 콘솔 로그
        console.log(`data.list.length: ${data.list.length}`);
        // 상품 데이터 확인
        if (data.list.length === 0) { // 없으면 noProductList를 True로 설정
          setBoolProduct(true);
        } else if (data.list.length < productsCount) { // 상품이 보여줄 갯수보다 적으면 가데이터로 채우기
          const newFiiledDataList = [
            ...data.list,
            ...Array(productsCount - data.list.length).fill({
              images: [search],
              name: "",
              description: "",
              price: 0,
              favoriteCount: 0,
            }),
          ];
          setProductsList(newFiiledDataList); 
        } else {
          setProductsList(data.list); // 이상 없으면 getProductsList 채우기
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return {
    getProductsList,
    noProduct,
    totalPageSize
  }

}
export default getProductData;