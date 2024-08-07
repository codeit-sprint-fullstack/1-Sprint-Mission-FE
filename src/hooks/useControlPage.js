import { useEffect, useState } from "react";

import getApiData from "../api/getProductsData.js";

const useControlPage = (initialPage, productMaxCount) => {
  const [nowPage, setNowPage] = useState(initialPage);
  const [totalPageSize, setTotalPageSize] = useState(1);

  useEffect(() => {
    getApiData()
      .then((data) => {
        setTotalPageSize(Math.ceil(data.totalCount / productMaxCount));
      })
      .catch((error) => console.error(error));
  }, [productMaxCount]);

  const handlePageChange = (page) => {
    setNowPage(page);
  };

  return {
    nowPage,
    totalPageSize,
    handlePageChange,
  };
};

export default useControlPage;
