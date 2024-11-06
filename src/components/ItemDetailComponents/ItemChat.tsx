import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./ItemChat.module.css";
import Chat from "./Chat";
import { fetchComments, addComment, editComment } from "@/utils/productChatApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInfiniteScroll } from "@/hooks/useComments";
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  UseMutationResult,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { Comment } from "@/types/Types";

interface ItemChatProps {
  initialComments: { list: Comment[]; nextCursor?: number | null };
  id: number;
}

export default function ItemChat({ initialComments, id }: ItemChatProps) {
  const [input, setInput] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const hasToastShownRef = useRef<boolean>(false);

  // useInfiniteQuery 사용
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  }: UseInfiniteQueryResult<{ list: Comment[]; nextCursor?: number | null }> =
    useInfiniteQuery({
      queryKey: ["comments", id],
      queryFn: async ({ pageParam = null }: { pageParam?: number | null }) =>
        fetchComments(id, pageParam),
      initialData: {
        pages: [initialComments],
        pageParams: [initialComments.nextCursor ?? null],
      },
      getNextPageParam: (lastPage: {
        list: Comment[];
        nextCursor?: number | null;
      }) => lastPage?.nextCursor ?? null,
      // 'initialPageParam'을 명시적으로 추가하여 초기 페이지 매개변수 정의
      initialPageParam: initialComments.nextCursor ?? null,
    });

  useEffect(() => {
    setFormValid(input.trim().length > 0);
  }, [input]);

  const addCommentMutation: UseMutationResult<
    Comment,
    Error,
    { content: string }
  > = useMutation({
    mutationFn: (newComment) => addComment(id, newComment),
    onSuccess: (addedComment) => {
      queryClient.setQueryData<{
        pages: { list: Comment[]; nextCursor?: number | null }[];
        pageParams: (number | null)[];
      }>(["comments", id], (oldData) => {
        if (!oldData) {
          return {
            pages: [
              { list: [addedComment], nextCursor: initialComments.nextCursor },
            ],
            pageParams: [initialComments.nextCursor ?? null],
          };
        }

        return {
          ...oldData,
          pages: [
            {
              list: [addedComment, ...oldData.pages[0].list],
              nextCursor: oldData.pages[0].nextCursor,
            },
            ...oldData.pages.slice(1),
          ],
          pageParams: oldData.pageParams,
        };
      });
      setInput("");
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
    },
  });

  const editCommentMutation: UseMutationResult<
    Comment,
    Error,
    { content: string }
  > = useMutation({
    mutationFn: (updatedComment) =>
      editComment(currentEditId as number, updatedComment),
    onSuccess: (editedComment) => {
      queryClient.setQueryData<{
        pages: { list: Comment[]; nextCursor?: number | null }[];
        pageParams: (number | null)[];
      }>(["comments", id], (oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            list: page.list.map((comment: Comment) =>
              comment.id === currentEditId ? editedComment : comment
            ),
          })),
          pageParams: oldData.pageParams,
        };
      });
      setIsEditing(false);
      setCurrentEditId(null);
      setInput("");
    },
    onError: (error) => {
      console.error("Error editing comment:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) return;

    const newComment = { content: input };

    if (isEditing) {
      editCommentMutation.mutate(newComment);
    } else {
      addCommentMutation.mutate(newComment);
    }
  };

  const loadMoreComments = useCallback(async () => {
    if (!hasNextPage) {
      if (!hasToastShownRef.current) {
        toast.info("모든 댓글을 불러왔습니다.");
        hasToastShownRef.current = true;
      }
      return;
    }

    if (isLoading || isFetchingNextPage) return;

    try {
      await fetchNextPage();
    } catch (error) {
      console.error("Error loading more comments:", error);
      toast.error("댓글을 불러오는 중 오류가 발생했습니다.");
    }
  }, [fetchNextPage, hasNextPage, isLoading, isFetchingNextPage]);

  useInfiniteScroll({
    loadMore: loadMoreComments,
    hasMore: hasNextPage,
    isLoading,
  });

  const handleEdit = (comment: Comment) => {
    setInput(comment.content);
    setIsEditing(true);
    setCurrentEditId(comment.id);
  };

  return (
    <>
      <div className={styles.addChatContainer}>
        <ToastContainer position="top-right" autoClose={2000} />
        <p className={styles.addText}>문의하기</p>
        <textarea
          className={styles.inputChat}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className={styles.addBtn}
          disabled={!formValid}
          onClick={handleSubmit}
        >
          {isEditing ? "수정" : "등록"}
        </button>
      </div>
      <Chat
        comments={data?.list?.flatMap((page) => page) || []}
        onEdit={handleEdit}
      />
    </>
  );
}
