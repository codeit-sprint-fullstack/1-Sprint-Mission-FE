import { useState, useCallback, useEffect } from "react";
import {
  fetchComments,
  createComments,
  updateComments,
} from "@/utils/articleChatApi";

export function useComments(articleId, initialComments) {
  const [comments, setComments] = useState(initialComments || []);
  const [cursor, setCursor] = useState(
    initialComments.length > 0
      ? initialComments[initialComments.length - 1].id
      : null
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreComments = useCallback(
    async (nextCursor) => {
      if (loading || !hasMore || !nextCursor) return;

      setLoading(true);
      try {
        const response = await fetchComments(articleId, nextCursor);
        const newComments = response.list || [];

        setComments((prevComments) => [...prevComments, ...newComments]);
        setCursor(response.nextCursor);
        setHasMore(response.nextCursor !== null); // 다음 커서가 없으면 hasMore를 false로 설정
      } catch (error) {
        console.error("Error fetching more comments:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, articleId]
  );

  const addComment = useCallback(
    async (commentContent) => {
      try {
        const newComment = await createComments(articleId, {
          content: commentContent,
        });
        if (newComment) {
          setComments((prevComments) => [newComment, ...prevComments]);
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    },
    [articleId]
  );

  // 댓글 수정 함수
  const editComment = useCallback(async (editCommentId, commentContent) => {
    try {
      const updatedComment = await updateComments(editCommentId, {
        content: commentContent,
      });
      if (updatedComment) {
        setComments((prevComments) =>
          prevComments.map((c) => (c.id === editCommentId ? updatedComment : c))
        );
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  }, []);

  return {
    comments,
    loadMoreComments,
    hasMore,
    loading,
    addComment,
    editComment,
    nextCursor: cursor, // nextCursor를 반환
  };
}

export const useInfiniteScroll = ({ loadMore, hasMore, isLoading }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        !isLoading &&
        hasMore
      ) {
        loadMore();
      } else {
        hasMore = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMore, hasMore, isLoading]);
};
