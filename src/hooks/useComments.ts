import { useState, useCallback, useEffect } from "react";
import {
  fetchComments,
  createComments,
  updateComments,
  deleteComments,
} from "@/utils/articleChatApi";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

// 댓글의 데이터 형식 정의
export interface ChatComment {
  id: number;
  content: string;
  createdAt: string;
  [key: string]: any; // 다른 추가 필드가 있을 경우
}

// 댓글 삭제 훅
export const useDeleteComment = (): UseMutationResult<void, Error, number> => {
  return useMutation<void, Error, number>({
    mutationFn: (id: number) => deleteComments(id),
    onError: (err) => {
      console.error("Error deleting comment:", err);
    },
  });
};

// 댓글 관리 훅
interface UseCommentsResult {
  comments: ChatComment[];
  loadMoreComments: (nextCursor: number | null) => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  addComment: (commentContent: string) => Promise<void>;
  editComment: (editCommentId: number, commentContent: string) => Promise<void>;
  nextCursor: number | null;
}

export function useComments(
  articleId: number,
  initialComments: ChatComment[]
): UseCommentsResult {
  const [comments, setComments] = useState<ChatComment[]>(
    initialComments || []
  );
  const [cursor, setCursor] = useState<number | null>(
    initialComments.length > 0
      ? initialComments[initialComments.length - 1].id
      : null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMoreComments = useCallback(
    async (nextCursor: number | null) => {
      if (loading || !hasMore || nextCursor === null) return;

      setLoading(true);
      try {
        const response = await fetchComments(articleId, nextCursor);
        const newComments: ChatComment[] = response.list || [];

        setComments((prevComments) => [...prevComments, ...newComments]);
        setCursor(response.nextCursor);
        setHasMore(response.nextCursor !== null);
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
    async (commentContent: string) => {
      try {
        const newComment: ChatComment = await createComments(articleId, {
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

  const editComment = useCallback(
    async (editCommentId: number, commentContent: string) => {
      try {
        const updatedComment: ChatComment = await updateComments(
          editCommentId,
          {
            content: commentContent,
          }
        );
        if (updatedComment) {
          setComments((prevComments) =>
            prevComments.map((c) =>
              c.id === editCommentId ? updatedComment : c
            )
          );
        }
      } catch (error) {
        console.error("Error editing comment:", error);
      }
    },
    []
  );

  return {
    comments,
    loadMoreComments,
    hasMore,
    loading,
    addComment,
    editComment,
    nextCursor: cursor,
  };
}

// 무한 스크롤 기능을 제공하는 훅
interface UseInfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export const useInfiniteScroll = ({
  loadMore,
  hasMore,
  isLoading,
}: UseInfiniteScrollProps) => {
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
