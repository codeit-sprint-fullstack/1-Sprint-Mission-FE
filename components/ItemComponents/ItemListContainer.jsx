import React, { useState } from "react";
import ItemList from "./ItemList.jsx";
import Pagination from "./Pagination.jsx";
import { useProducts } from "@/hooks/useProducts";
import styles from "./ItemListContainer.module.css";

export default function ItemListContainer({
  initialProducts,
  initialTotalCount,
}) {
  const [keyword, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");

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

  const handleSortOrderChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    handleSortChange(newSortOrder);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className={styles.productContainer}>
        <ItemList
          products={products}
          sortOrder={sortOrder}
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
          onSortChange={handleSortOrderChange}
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
