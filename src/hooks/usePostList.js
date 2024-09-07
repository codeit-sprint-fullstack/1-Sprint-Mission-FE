import { useState, useEffect, useCallback } from "react";
import { fetchArticles } from "../api/api"; // 게시글 API 호출 함수
import { LIMIT } from "../constants"; // 상수

export default function usePostList(order, initialCursor) {
  const [posts, setPosts] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [cursor, setCursor] = useState(initialCursor);

  // 게시글 가져오기 함수
  const fetchPosts = useCallback(
    async (page = 1) => {
      try {
        setLoadingError(null);
        const response = await fetchArticles({ order, cursor, limit: LIMIT });
        const { paging, list, totalCount } = response;

        if (Array.isArray(list)) {
          setPosts((prevPosts) =>
            page === 1 ? list : [...prevPosts, ...list]
          );
          setCursor(paging ? paging.nextCursor : null);
          setHasNext(paging ? paging.hasNext : false);
          setTotalPages(totalCount ? Math.ceil(totalCount / LIMIT) : 1);
        } else {
          throw new Error("게시글 목록 데이터가 유효하지 않습니다.");
        }
      } catch (error) {
        setLoadingError(error.message);
      }
    },
    [order, cursor]
  );

  useEffect(() => {
    fetchPosts(); // 초기 로드
  }, [order, fetchPosts]);

  return { posts, hasNext, loadingError, totalPages, fetchPosts };
}
