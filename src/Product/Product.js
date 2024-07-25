import { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";

export function useFetchProducts(params) {
  const baseUrl = "https://panda-market-api.vercel.app/products";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(baseUrl, { params });
        const data = response.data.list || [];
        const totalItems = response.data.totalCount || 0;

        setProducts(data);
        setTotalCount(totalItems);
        setTotalPages(Math.ceil(totalItems / params.pageSize));
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params.orderBy, params.page, params.pageSize, params.keyword]); // 필요한 의존성만 추가

  return { products, loading, totalCount, totalPages };
}
