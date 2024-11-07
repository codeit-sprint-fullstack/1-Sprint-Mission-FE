import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, getProductById } from "../../api/productApi";
import { useRouter } from "next/router";
import useScreenType from "../../hooks/useScreenType";
import Pagination from "../../components/Pagination";
import ProductSearchBar from "../../components/ProductSearchBar";
import ProductRegisterButton from "../../components/ProductRegisterButton";
import SortOptions from "../../components/SortOptions";
import Spinner from "../../components/Spinner";
import BestProducts from "../../components/BestProducts";
import styles from "../../styles/itemList.module.css";
import { ProductResponse } from "../../api/productApi";


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string[];
  likes?: number;
}

const ProductListPage: React.FC = () => {
  const router = useRouter();
  const screenType = useScreenType();
  const queryClient = useQueryClient();
  const [sortOrder, setSortOrder] = useState<string>("recent");
  const [productSearch, setProductSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const totalPages = 5;

  useEffect(() => {
    if (screenType === "desktop") {
      setPageSize(10);
    } else if (screenType === "tablet") {
      setPageSize(6);
    } else {
      setPageSize(4);
    }
  }, [screenType]);

  // 상품 목록을 가져오는 Query 설정
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", page, pageSize, sortOrder, productSearch],
    queryFn: () =>
      getProducts(page, pageSize, sortOrder, productSearch).then((data) =>
        data.map((item: ProductResponse) => ({
          ...item,
          image: item.image ? [item.image] : [],
        }))
      ),
    staleTime: 1000 * 60, // 1분
  });

  const products: Product[] = Array.isArray(data) ? data : [];

  const handleMouseEnter = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: () => getProductById(id),
    });
  };

  const handleProductClick = (id: number) => {
    router.push(`/items/${id}`);
  };

  if (error instanceof Error) {
    return <p>상품을 불러오는 중 오류가 발생했습니다: {error.message}</p>;
  }

  return (
    <Spinner dataLoaded={!isLoading}>
      <div className={styles.productList}>
        <BestProducts />

        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>판매 중인 상품</h2>
          <div className={styles.controlContainer}>
            <ProductSearchBar
              productSearch={productSearch}
              setProductSearch={setProductSearch}
              onSearchSubmit={() => {
                setPage(1);
                refetch(); // 검색 시 강제 갱신
              }}
            />
            <ProductRegisterButton />
            <SortOptions
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              screenType={screenType as "mobile" | "pc"}
              setProducts={() => {}}
            />
          </div>
        </div>

        <div className={styles.allProductsContents}>
          {products.map((item) => (
            <div
              key={item.id}
              className={styles.allProducts}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onClick={() => handleProductClick(item.id)}
            >
              {item.image?.length && (
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className={styles.productImg}
                />
              )}
              <h2 className={styles.productTitle}>{item.name}</h2>
              <h2 className={styles.productPrice}>
                {item.price.toLocaleString("ko-KR")}원
              </h2>
              <span className={styles.like}>
                <img src="/image/heart.svg" alt="좋아요" />
                {item.likes || 0}
              </span>
            </div>
          ))}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </Spinner>
  );
};

export default ProductListPage;

