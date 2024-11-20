import React, { useState } from "react";
import ItemList from "./ItemList";
import Pagination from "./Pagination";
import { useProducts } from "@/hooks/useProducts";
import styles from "./ItemListContainer.module.css";
import { Product } from "@/types/Types";

// Props 타입 정의
interface ItemListContainerProps {
  initialProducts: Product[];
  initialTotalCount: number;
}

export default function ItemListContainer({
  initialProducts,
  initialTotalCount,
}: ItemListContainerProps) {
  const [keyword, setKeyword] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("recent");
  const {
    products,
    itemsPerPage,
    currentPage,
    handlePageChange,
    handleSortChange,
    handleKeywordSearch,
    loading,
    error,
  } = useProducts(initialProducts, initialTotalCount);

  // 키워드 변경 핸들러
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // 검색어 입력 시 엔터 키 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleKeywordSearch(keyword);
    }
  };

  // 정렬 순서 변경 핸들러
  const handleSortOrderChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
    handleSortChange(newSortOrder);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.toString()}</p>;

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
        totalCount={initialTotalCount}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
