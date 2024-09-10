import { useState, useEffect, useCallback } from "react";
import { fetchArticles } from "../api/api"; // 게시글 API 호출 함수
import { LIMIT } from "../constants"; // 상수

export default function usePostList(order) {
  const [posts, setPosts] = useState([]);
  const [hasNext, setHasNext] = useState(true); // 초기값을 true로 설정
  const [loadingError, setLoadingError] = useState(null);
  const [cursor, setCursor] = useState(null); // 초기 커서를 null로 설정
  const [loading, setLoading] = useState(false); // 로딩 상태 기본값을 false로 설정

  // 게시글 가져오기 함수
  const fetchPosts = useCallback(
    async (append = false) => {
      try {
        setLoading(true);
        setLoadingError(null);
        const response = await fetchArticles({ order, cursor, limit: LIMIT });
        console.log("API 응답:", response);

        const { paging, totalCount } = response;
        const list = response; // API 응답의 최상위 요소가 리스트

        if (Array.isArray(list)) {
          setPosts((prevPosts) => (append ? [...prevPosts, ...list] : list));
          setCursor(paging ? paging.nextCursor : null);
          setHasNext(paging ? paging.hasNext : false);
        } else {
          throw new Error("게시글 목록 데이터가 유효하지 않습니다.");
        }
      } catch (error) {
        setLoadingError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [order, cursor]
  );

  useEffect(() => {
    fetchPosts(); // 초기 로드
  }, [order, fetchPosts]);

  return { posts, hasNext, loadingError, fetchPosts, loading };
}
