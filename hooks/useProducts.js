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

  const handlePageChange = async (newPage) => {
    setLoading(true);
    setCurrentPage(newPage);

    try {
      const { list: newProducts, totalCount: newTotalCount } =
        await fetchProducts({
          pageSize: itemsPerPage,
          page: newPage,
          keyword: "",
          orderBy: "recent",
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

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    handlePageChange(currentPage);
  }, [itemsPerPage]);

  return {
    products,
    totalCount,
    currentPage,
    loading,
    error,
    handlePageChange,
    itemsPerPage,
  };
};
