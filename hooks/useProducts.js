// hooks/useProducts.js
import { useState } from "react";
import { fetchProducts } from "@/utils/productApi";

export const useProducts = (
  initialProducts,
  initialTotalCount,
  pageSize = 10
) => {
  const [products, setProducts] = useState(initialProducts);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 페이지 변경 처리 함수
  const handlePageChange = async (newPage) => {
    setLoading(true);
    setCurrentPage(newPage);

    try {
      const { list: newProducts, totalCount: newTotalCount } =
        await fetchProducts({
          pageSize,
          page: newPage,
          keyword: "", // 추가로 검색 기능을 추가할 수 있습니다.
          orderBy: "recent", // 정렬 조건도 추가할 수 있습니다.
        });

      setProducts(newProducts);
      setTotalCount(newTotalCount);
    } catch (err) {
      setError("상품을 불러오는 중 에러가 발생했습니다.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    totalCount,
    currentPage,
    loading,
    error,
    handlePageChange,
  };
};
