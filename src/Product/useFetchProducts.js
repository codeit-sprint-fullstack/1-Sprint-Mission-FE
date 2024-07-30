import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchProducts({ orderBy, pageSize, page, keyword }) {
  const baseUrl = "https://panda-market-api.vercel.app/products";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = { orderBy, pageSize, page, keyword };
        const response = await axios.get(baseUrl, { params }); // 파라미터 기준으로 상품 가져오기
        const data = response.data.list || [];
        const totalItems = response.data.totalCount || 0;

        setProducts(data);
        setTotalCount(totalItems);
        setTotalPages(Math.ceil(totalItems / pageSize));
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [orderBy, page, pageSize, keyword]); // 필요한 의존성만 추가

  return { products, loading, totalCount, totalPages };
}
