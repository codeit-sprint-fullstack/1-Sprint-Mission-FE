import { useState, useCallback, useEffect } from "react";
import { throttle } from "@/utils/throttle";
import {
  fetchComments,
  createComments,
  updateComments,
} from "@/utils/articleChatApi";

export function useComments(
  articleId,
  initialComments,
  totalComments,
  pageSize
) {
  const [comments, setComments] = useState(initialComments);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    initialComments.length < totalComments
  );

  // 댓글 추가 로드 함수
  const loadMoreComments = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const response = await fetchComments(articleId, nextPage, pageSize);
      const newComments = response.data || [];

      setComments((prevComments) => [...prevComments, ...newComments]);
      setPage(nextPage);

      if (comments.length + newComments.length >= totalComments) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more comments:", error);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    loading,
    hasMore,
    comments.length,
    totalComments,
    pageSize,
    articleId,
  ]);

  // 댓글 등록 함수
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
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMore, hasMore, isLoading]);
};
