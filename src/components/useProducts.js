import { useState, useEffect, useCallback } from "react";
import { getProducts } from "../api";

function useProducts({ page=1, pageSize=10, keyword='', orderBy='', order='' }, type) {
  const [items, setItems] = useState([]);
  const [isLoadingError, setIsLoadingError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const handleLoad = useCallback(async (options) => {
    try {
      setIsLoadingError(null);
      const result = await getProducts(options);
      if (type === 'best') {
        setItems(result.list);
      } else {
        const { list, totalCount } = result;
        setTotalCount(totalCount);
        if (options.order === 'like') {
          const sorted = [...list].sort((a, b) => b.favoriteCount - a.favoriteCount);
          setItems(sorted);
        } else if (options.order === 'latest') {
          const sorted = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setItems(sorted);
        } else {
          setItems(list);
        }
      }
    } catch (error) {
      setIsLoadingError(error);
    }
  }, [type]);

  useEffect(() => {
    if (type === 'best') {
      handleLoad({ page, pageSize, orderBy });
    } else {
      handleLoad({ page, pageSize, keyword, order });
    }
  }, [page, pageSize, keyword, orderBy, order, handleLoad, type]);

  return { items, isLoadingError, totalCount };
}

export default useProducts;
