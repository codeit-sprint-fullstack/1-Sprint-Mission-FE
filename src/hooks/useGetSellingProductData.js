import { useEffect, useState } from "react";
import getApiData from "../api/getApiData.js";
import imgDefualt from "../images/img_default.png";

const useProductData = (deviceType, initialPage, sortOption, keyword) => {
  const [sellingProducts, setProductsList] = useState([]);
  const [nowPage, setNowPage] = useState(initialPage);
  const [totalPageSize, setTotalPageSize] = useState(1);
  const [SellingProductCountPerRow, setSellingProductCountPerRow] = useState(10);

  useEffect(() => { 
    if (deviceType === "PC") {
      setSellingProductCountPerRow(10)
    } else if (deviceType === "Tablet") {
      setSellingProductCountPerRow(8)
    } else if (deviceType === "Mobile") {
      setSellingProductCountPerRow(6)
    }
  },[deviceType])

  useEffect(() => {
    getApiData(nowPage, SellingProductCountPerRow, sortOption, keyword)
      .then((data) => {
        setTotalPageSize(Math.ceil(data.totalCount / SellingProductCountPerRow));
        if (data.list.length < SellingProductCountPerRow) {
          setProductsList([
            ...data.list,
            ...Array(SellingProductCountPerRow - data.list.length).fill({
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
  }, [SellingProductCountPerRow, nowPage, sortOption, keyword]);

  const handlePageChange = (page) => {
    setNowPage(page);
  };

  return { nowPage, sellingProducts, totalPageSize, handlePageChange };
};
export default useProductData;
