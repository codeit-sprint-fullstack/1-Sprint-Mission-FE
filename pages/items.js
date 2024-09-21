import React, { useState, useEffect } from "react";
import ItemList from "@/components/ItemComponents/ItemList";
import Pagination from "@/components/ItemComponents/Pagination";
import { fetchProducts } from "@/utils/productApi";
import { useProducts } from "@/hooks/useProducts";
import styles from "@/styles/items.module.css";

export default function Items({ initialProducts, initialTotalCount }) {
  const {
    products,
    totalCount,
    currentPage,
    handlePageChange,
    handleSortChange,
    loading,
    error,
    itemsPerPage,
  } = useProducts(initialProducts, initialTotalCount);

  return (
    <>
      <div className={styles.productContainer}>
        <ItemList
          products={products}
          itemsPerPage={itemsPerPage}
          sortOrder="recent"
          onSortChange={handleSortChange}
        />
      </div>

      <Pagination
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
