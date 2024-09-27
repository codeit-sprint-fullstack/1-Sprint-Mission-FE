import styles from "@/styles/ProductList.module.css";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api.js";
import ProductCard from "@/components/ProductCard.js";
import Link from "next/link";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination.js";

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => getProducts(currentPage),
  });

  useEffect(() => {
    if (data) {
      const pages = Math.ceil(data.totalCount / 10);
      const array = Array.from({ length: pages }, (value, i) => i + 1);
      setTotalPage(array);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <nav className={styles.productListNav}>
        <span className={styles.productListTitle}>판매 중인 상품</span>
        <div className={styles.productListUtilContainer}>
          <input
            className={styles.productListSearch}
            placeholder="검색할 상품을 입력해주세요"
          />
          <Link href="./regist" className={styles.productListRegistBtn}>
            상품 등록하기
          </Link>
          <div className={styles.productListDropdown}>최신순</div>
        </div>
      </nav>
      <div className={styles.productList}>
        {data.list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
