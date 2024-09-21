import { useState, useEffect } from "react";
import { fetchProducts } from "@/utils/productApi";
import { throttle } from "@/utils/throttle"; // throttle 함수 임포트

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
  const [orderBy, setOrderBy] = useState("recent"); // Default order
  const [keyword, setKeyword] = useState(""); // Search keyword

  const calculateTotalPages = (totalCount, itemsPerPage) => {
    return Math.ceil(totalCount / itemsPerPage);
  };

  const fetchAndSetProducts = async (
    newPage,
    sortOrder,
    searchKeyword,
    itemsPerPage
  ) => {
    setLoading(true);
    setCurrentPage(newPage);
    try {
      const { list: newProducts, totalCount: newTotalCount } =
        await fetchProducts({
          pageSize: itemsPerPage,
          page: newPage,
          keyword: searchKeyword || keyword,
          orderBy: sortOrder || orderBy,
        });

      setProducts(newProducts);
      setTotalCount(newTotalCount); // Set totalCount from the API response
    } catch (err) {
      setError("상품을 불러오는 중 에러가 발생했습니다.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    fetchAndSetProducts(newPage, orderBy, keyword, itemsPerPage);
  };

  const handleSortChange = (newSortOrder) => {
    setOrderBy(newSortOrder);
    fetchAndSetProducts(1, newSortOrder, keyword, itemsPerPage);
  };

  const handleKeywordSearch = (newKeyword) => {
    setKeyword(newKeyword);
    fetchAndSetProducts(1, orderBy, newKeyword, itemsPerPage);
  };

  // 화면 크기에 따라 itemsPerPage 업데이트 (throttle 적용)
  const updateItemsPerPage = () => {
    const screenWidth = window.innerWidth;
    let newItemsPerPage;

    if (screenWidth <= 743) {
      newItemsPerPage = 4;
    } else if (screenWidth <= 1199) {
      newItemsPerPage = 6;
    } else {
      newItemsPerPage = 10;
    }

    setItemsPerPage(newItemsPerPage);
    fetchAndSetProducts(1, orderBy, keyword, newItemsPerPage);
  };

  const throttledUpdateItemsPerPage = throttle(updateItemsPerPage, 200);

  useEffect(() => {
    throttledUpdateItemsPerPage();
    window.addEventListener("resize", throttledUpdateItemsPerPage);

    return () => {
      window.removeEventListener("resize", throttledUpdateItemsPerPage);
    };
  }, []);

  return {
    products,
    totalCount, // totalCount 포함
    itemsPerPage, // itemsPerPage 포함
    currentPage,
    totalPages: calculateTotalPages(totalCount, itemsPerPage), // 페이지 수 계산
    loading,
    error,
    handlePageChange,
    handleSortChange,
    handleKeywordSearch,
  };
};
