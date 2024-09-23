import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, getProductById } from "../../api/productApi";
import { useRouter } from "next/router";
import useScreenType from "../../hooks/useScreenType";
import Pagination from "../../components/Pagination";
import ProductSearchBar from "../../components/ProductSearchBar";
import ProductRegisterButton from "../../components/ProductRegisterButton";
import SortOptions from "../../components/SortOptions";
import styles from "../../styles/itemList.module.css";

const ProductListPage = () => {
  const router = useRouter();
  const screenType = useScreenType();
  const queryClient = useQueryClient();
  const [sortOrder, setSortOrder] = useState("recent");
  const [productSearch, setProductSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
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
    queryFn: () => getProducts(page, pageSize, sortOrder, productSearch),
    staleTime: 1000 * 60, // 1분
    cacheTime: 1000 * 60 * 10, // 10분
    refetchInterval: 1000 * 30, // 30초
  });

  const products = Array.isArray(data?.list) ? data.list : [];

  // Prefetching 상품 상세 데이터
  const handleMouseEnter = (id) => {
    queryClient.prefetchQuery(["product", id], () => getProductById(id));
  };

  const handleProductClick = (id) => {
    router.push(`/items/${id}`);
  };

  if (isLoading) return <p>상품을 불러오는 중입니다...</p>; // 로딩 인디케이터
  if (error) return <p>상품을 불러오는 중 오류가 발생했습니다.</p>; // 에러 메시지

  return (
    <div className={styles.productList}>
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
            screenType={screenType}
          />
        </div>
      </div>

      <div className={styles.allProductsContents}>
        {products.map((item) => (
          <div
            key={item._id || item.id}
            className={styles.allProducts}
            onMouseEnter={() => handleMouseEnter(item._id || item.id)}
            onClick={() => handleProductClick(item._id || item.id)}
          >
            <img
              src={item.images?.[0] || "/image/default.svg"}
              alt={item.name}
              className={styles.productImg}
            />
            <h2 className={styles.productTitle}>{item.name}</h2>
            <h2 className={styles.productPrice}>
              {item.price.toLocaleString("ko-KR")}원
            </h2>
            <span className={styles.like}>
              <img src="/image/heart.svg" alt="좋아요" />
              {item.favoriteCount || 0}
            </span>
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default ProductListPage;

