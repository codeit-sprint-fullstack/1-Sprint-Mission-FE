import { useState, useEffect, useCallback } from "react";
import { fetchBestArticles } from "@/utils/articleApi";

export function useBestProducts() {
  const [bestProducts, setBestProducts] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  // 화면 크기에 따라 데이터를 가져오는 함수
  const fetchBestArticlesBasedOnScreenSize = useCallback(async () => {
    let size;

    const screenWidth = window.innerWidth;

    if (screenWidth <= 743) {
      size = 1; // 모바일 화면
    } else if (screenWidth <= 1199) {
      size = 2; // 태블릿 화면
    } else {
      size = 3; // 데스크탑 화면
    }

    setLoading(true); // 데이터 로딩 시작
    try {
      const response = await fetchBestArticles(size);
      setBestProducts(response); // 베스트 상품 업데이트
    } catch (error) {
      console.error("Error fetching best articles:", error);
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  }, []);

  // 최초 로딩 시 화면 크기를 기반으로 데이터를 가져옴
  useEffect(() => {
    fetchBestArticlesBasedOnScreenSize(); // 첫 로딩 시 호출
  }, [fetchBestArticlesBasedOnScreenSize]); // 의존성 배열에 콜백 함수 추가

  return { bestProducts, loading };
}
