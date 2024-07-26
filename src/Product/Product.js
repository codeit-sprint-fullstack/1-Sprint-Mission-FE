import { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";

export function useFetchProducts(params) {
  const baseUrl = "https://panda-market-api.vercel.app/products"; // API 주소
  const [products, setProducts] = useState([]); // 상품
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [totalCount, setTotalCount] = useState(0); // 상품 수
  const [totalPages, setTotalPages] = useState(0); // 페이지 수

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(baseUrl, { params }); // 파라미터 기준으로 상품 가져오기
        const data = response.data.list || []; // 데이터 리스트 저장
        const totalItems = response.data.totalCount || 0; // 상품 수 저장

        setProducts(data);
        setTotalCount(totalItems);
        setTotalPages(Math.ceil(totalItems / params.pageSize)); // 숫자 올림해서 표시
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // 작업이 끝나거나 오류가 나면 로딩 상태 false
      }
    };

    fetchProducts();
  }, [params.orderBy, params.page, params.pageSize, params.keyword]); // 필요한 의존성만 추가

  return { products, loading, totalCount, totalPages };
}
