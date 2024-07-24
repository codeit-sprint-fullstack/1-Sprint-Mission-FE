import { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";

export function useFetchProducts(params) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0); // 전체 데이터 수 상태 추가
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수 상태 추가

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://panda-market-api.vercel.app/products",
          { params }
        );
        const data = response.data.list || [];
        const totalItems = response.data.totalCount; // 응답 데이터에서 totalCount 가져오기

        const pageSize = params.pageSize || 10;

        setProducts(data);
        setTotalCount(totalItems);
        setTotalPages(Math.ceil(totalItems / pageSize)); // 총 페이지 수 계산
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

  return { products, loading, totalCount, totalPages };
}
