"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import ItemsPageHeader from "../components/ItemsPageHeader";
import { useRouter } from "next/router";
import styles from "./ItemsPage.module.css"; // CSS 모듈 임포트
import ResponsiveStyles from "../styles/Responsive.module.css"; // CSS 모듈 임포트
import ProductList from "../components/ProductList";
import BestProducts from "../components/BestProducts";
import { filterProductsByName } from "../api/api";
import Pagination from "../components/Pagination";
import useProductList from "../hooks/useProductList";
import { LIMIT } from "../constants";
import Image from "next/image"; // Next.js의 Image 컴포넌트 임포트

export default function ItemsPage() {
  const router = useRouter(); // useNavigate 대신 useRouter 사용
  const [order, setOrder] = useState("createdAt");

  // 검색 기능
  const [searchProduct, setSearchProduct] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);

  // 커스텀 훅 호출
  const { products, hasNext, loadingError, totalPages, fetchProducts } =
    useProductList(order, null);

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
    setCurrentPage(1); // 정렬 순서 변경 시 첫 페이지로 이동
    fetchProducts(1);
  };

  /* 엔터키로 검색 입력 */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSearchChange = (event) => {
    setSearchProduct(event.target.value);
  };

  const handleSearchClick = useCallback(async () => {
    try {
      if (searchProduct.trim() === "") {
        setSearchResults([]);
        setSearchError("⚠ 검색어를 입력해 주세요.");
        return;
      }
      const results = filterProductsByName(products, searchProduct);
      if (results.length === 0) {
        setSearchResults([]);
        setSearchError("상품이 존재하지 않습니다.");
      } else {
        setSearchResults(results);
        setSearchError(null);
      }
    } catch (error) {
      setSearchError("검색 중 오류가 발생했습니다.");
      console.error("검색 오류", error);
    }
  }, [searchProduct, products]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    fetchProducts(page);
  };

  // 최신순 정렬 및 좋아요 순 정렬 기능 추가
  const sortedProducts = useMemo(() => {
    if (Array.isArray(products)) {
      return [...products].sort((a, b) => {
        if (order === "favoriteCount") {
          return b.favoriteCount - a.favoriteCount; // 좋아요 순 정렬
        }
        return new Date(b.createdAt) - new Date(a.createdAt); // 최신순 정렬
      });
    }
    return []; // products가 배열이 아닐 경우 빈 배열 반환
  }, [products, order]);

  useEffect(() => {
    fetchProducts(currentPage); // 초기 로드 및 페이지 변경 시 로드
  }, [order, currentPage, fetchProducts]);

  // 현재 페이지에 맞는 상품 목록 추출
  const currentPageProducts = sortedProducts.slice(0, 10); // 처음 10개 상품만 추출

  /* 상품 등록하기 버튼 눌렀을때 이동페이지*/
  const handleAddProductClick = () => {
    router.push("/registration"); // navigate 대신 router.push 사용
  };

  return (
    <div className={styles.ItemsPage}>
      <ItemsPageHeader />
      <main className={styles.mainContent}>
        <h2>베스트 상품</h2>
        <BestProducts />
        <div className={styles.saleProductNav}>
          <h2 className={styles.heading}>판매 중인 상품</h2>
          <div className={styles.inputBtDrop}>
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className={styles.searchInput}
              style={{ backgroundImage: `url(/images/ic_search.png)` }} // public/images 폴더에서 이미지 접근
              value={searchProduct}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className={styles.addProductBotton}
              onClick={handleAddProductClick}
            >
              상품 등록하기
            </button>
            <select
              className={styles.sortDropDown}
              onChange={handleOrderChange}
            >
              <option value="createdAt">최신순</option>
              <option value="favoriteCount">좋아요 순</option>{" "}
              {/* 좋아요 순 정렬 옵션 추가 */}
            </select>
          </div>
        </div>
        {searchError && <div className={styles.searchError}>{searchError}</div>}
        {searchProduct && searchResults.length > 0 && (
          <div className={styles.searchResults}>
            <h3>검색 결과</h3>
            <ul>
              {searchResults.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          </div>
        )}
        {loadingError && <span>{loadingError}</span>}
        <ProductList
          products={searchProduct ? searchResults : currentPageProducts}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageClick}
          hasNext={hasNext}
        />
      </main>
    </div>
  );
}
