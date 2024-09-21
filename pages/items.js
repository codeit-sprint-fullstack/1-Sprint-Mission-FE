// pages/Items.js
import React from "react";
import ItemList from "@/components/ItemComponents/ItemList";
import Pagination from "@/components/ItemComponents/Pagination";
import { useProducts } from "@/hooks/useProducts";
import { fetchProducts } from "@/utils/productApi";
import styles from "@/styles/items.module.css";

export default function Items({ initialProducts, initialTotalCount }) {
  // useProducts 훅을 사용하여 상품 및 페이지네이션 관리
  const {
    products,
    totalCount,
    currentPage,
    handlePageChange,
    loading,
    error,
  } = useProducts(initialProducts, initialTotalCount);

  return (
    <>
      <div className={styles.productContainer}>
        <ItemList products={products} />
      </div>
      <Pagination
        totalCount={totalCount}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

// getServerSideProps로 초기 데이터 패칭
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
