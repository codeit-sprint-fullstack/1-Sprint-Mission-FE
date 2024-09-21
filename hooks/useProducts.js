import { useState, useEffect } from "react";
import { fetchProducts } from "@/utils/productApi";

export const useProducts = (
  initialProducts,
  initialTotalCount,
  initialItemsPerPage = 10
) => {
  const [products, setProducts] = useState(initialProducts);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState("recent"); // 정렬 기준 추가

  // 페이지 변경 및 정렬 변경 처리 함수
  const fetchAndSetProducts = async (newPage, sortOrder) => {
    setLoading(true);
    setCurrentPage(newPage);

    try {
      const { list: newProducts, totalCount: newTotalCount } =
        await fetchProducts({
          pageSize: itemsPerPage,
          page: newPage,
          keyword: "", // 검색어가 필요할 경우 추가 가능
          orderBy: sortOrder || orderBy, // 정렬 기준 사용
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

  // 페이지 변경 처리 함수
  const handlePageChange = (newPage) => {
    fetchAndSetProducts(newPage);
  };

  // 정렬 기준 변경 처리 함수
  const handleSortChange = (newSortOrder) => {
    setOrderBy(newSortOrder);
    fetchAndSetProducts(currentPage, newSortOrder); // 정렬 기준에 맞게 데이터를 다시 불러옴
  };

  // 화면 크기별 itemsPerPage 업데이트 함수
  const updateItemsPerPage = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 743) {
      setItemsPerPage(4);
    } else if (screenWidth <= 1199) {
      setItemsPerPage(6);
    } else {
      setItemsPerPage(10);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    // 최초 데이터 로드
    fetchAndSetProducts(currentPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, [itemsPerPage, orderBy]); // itemsPerPage 또는 orderBy가 변경될 때마다 호출

  return {
    products,
    totalCount,
    currentPage,
    loading,
    error,
    handlePageChange,
    handleSortChange, // 정렬 변경 핸들러 반환
    itemsPerPage,
  };
};
