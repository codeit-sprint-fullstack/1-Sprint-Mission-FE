// pages/items/index.js

import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Products.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { fetchProducts, fetchProductById } from "../../api/api";

const ItemsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const router = useRouter();
  const itemsPerPage = 10; // 한 페이지에 10개 상품 표시

  const params = {
    page: currentPage,
    pageSize: itemsPerPage,
    orderBy: sortOption,
    keyword: searchKeyword,
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    keepPreviousData: true,
    refetchInterval: 5000, // 5초마다 자동으로 데이터 갱신
  });

  const totalPages = data ? Math.ceil(data.totalCount / itemsPerPage) : 1;

  if (error) return <div>에러 발생: {error.message}</div>;

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    let startPage =
      Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons + 1;
    let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className={styles.pagination}>
        {startPage > 1 && (
          <button onClick={() => setCurrentPage(startPage - 1)}>&lt;</button>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={number === currentPage ? styles.active : ""}
          >
            {number}
          </button>
        ))}
        {endPage < totalPages && (
          <button onClick={() => setCurrentPage(endPage + 1)}>&gt;</button>
        )}
      </div>
    );
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data && data.list) {
      data.list.forEach((product) => {
        queryClient.prefetchQuery(["product", product.id], () =>
          fetchProductById(product.id)
        );
      });
    }
  }, [data, queryClient]);

  return (
    <div className={styles.pageContainer}>
      <Nav />
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>판매 중인 상품</h1>
        <div className={styles.topBar}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="검색할 상품을 입력해주세요"
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              검색
            </button>
          </form>
          <button
            onClick={() => router.push("/items/create")}
            className={styles.createButton}
          >
            상품 등록하기
          </button>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="recent">최신순</option>
            <option value="favorite">인기순</option>
            <option value="priceAsc">가격낮은순</option>
            <option value="priceDesc">가격높은순</option>
          </select>
        </div>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          <div className={styles.productGrid}>
            {data.list.map((item) => (
              <Link
                href={`/items/${item.id}`}
                key={item.id}
                className={styles.productItem}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={220}
                    height={220}
                    objectFit="cover"
                    unoptimized
                    onError={(e) => {
                      e.target.onerror = null; // 무한 루프 방지
                    }}
                  />
                </div>
                <h2 className={styles.productName}>{item.name}</h2>
                <p className={styles.productPrice}>
                  {item.price.toLocaleString()}원
                </p>
                <p className={styles.favoriteCount}>♥ {item.favoriteCount}</p>
              </Link>
            ))}
          </div>
        )}
        {!isLoading && renderPagination()}
      </div>
      <Footer />
    </div>
  );
};

export default ItemsPage;
