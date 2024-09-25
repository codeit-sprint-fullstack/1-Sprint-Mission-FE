import React, { useState } from "react";
import ItemList from "@/components/ItemComponents/ItemList";
import Pagination from "@/components/ItemComponents/Pagination";
import { useProducts } from "@/hooks/useProducts";
import styles from "@/styles/items.module.css";
import { fetchProducts } from "@/utils/productApi";

export default function Items({ initialProducts, initialTotalCount }) {
  const [keyword, setKeyword] = useState(""); // 검색어 상태

  const {
    products,
    totalPages,
    totalCount,
    itemsPerPage,
    currentPage,
    handlePageChange,
    handleSortChange,
    handleKeywordSearch,
    loading,
    error,
  } = useProducts(initialProducts, initialTotalCount);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleKeywordSearch(keyword);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className={styles.productContainer}>
        <ItemList
          products={products}
          sortOrder="recent"
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
          onSortChange={handleSortChange}
        />
      </div>
      <Pagination
        totalPages={totalPages}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { list: initialProducts, totalCount: initialTotalCount } =
      await fetchProducts({
        pageSize: 10,
        page: 1,
        keyword: "",
        orderBy: "recent",
      });

    return {
      props: {
        initialProducts,
        initialTotalCount,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);

    return {
      props: {
        initialProducts: [],
        initialTotalCount: 0,
      },
    };
  }
}
