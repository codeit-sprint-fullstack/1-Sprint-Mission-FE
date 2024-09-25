"use client";

import { useState, useEffect, useCallback } from "react";
import { getProductList } from "../api/api";
import { LIMIT } from "../constants";

function useProductList(order, initialCursor) {
  const [products, setProducts] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [cursor, setCursor] = useState(initialCursor);

  const fetchProducts = useCallback(async () => {
    try {
      setLoadingError(null);
      const response = await getProductList({ order, cursor, limit: LIMIT });

      // 응답 데이터의 구조 확인
      console.log("받아온 객체:", response);

      // response.list가 상품 목록이므로 이를 상태에 저장
      if (Array.isArray(response.list)) {
        setProducts(response.list); // 전체 상품 목록 설정
        setCursor(null); // cursor는 사용하지 않음
        setHasNext(false); // 더 이상의 페이지가 없으므로 false로 설정
        setTotalPages(Math.ceil(response.totalCount / LIMIT)); // 전체 페이지 수 계산
      } else {
        throw new Error("상품 목록 데이터가 유효하지 않습니다.");
      }
    } catch (error) {
      setLoadingError(error.message);
    }
  }, [order, cursor]);

  useEffect(() => {
    fetchProducts(); // 초기 로드
  }, [order, cursor, fetchProducts]);

  return { products, hasNext, loadingError, totalPages, fetchProducts };
}

export default useProductList;
