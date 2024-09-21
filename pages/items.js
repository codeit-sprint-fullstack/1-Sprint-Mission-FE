import React, { useState } from "react";
import ItemList from "@/components/ItemComponents/ItemList";
import { fetchProducts } from "@/utils/productApi";
import styles from "@/styles/items.module.css";
import Pagination from "@/components/ItemComponents/Pagination";

export default function Items({ initialProducts, initialTotalCount }) {
  // 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(initialProducts);
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  // 페이지 변경 처리 함수
  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);
    try {
      // 새 페이지의 데이터를 가져옴
      const { list: newProducts, totalCount: newTotalCount } =
        await fetchProducts({
          pageSize: 10,
          page: newPage,
          keyword: "",
        });
      setProducts(newProducts);
      setTotalCount(newTotalCount);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <>
      <div className={styles.productContainer}>
        <ItemList products={products} />
      </div>
      {/* Pagination에 현재 페이지와 페이지 변경 함수 전달 */}
      <Pagination
        totalCount={totalCount}
        itemsPerPage={10}
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
