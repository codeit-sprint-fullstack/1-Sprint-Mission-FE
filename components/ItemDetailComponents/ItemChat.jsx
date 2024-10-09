import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./ItemChat.module.css";
import Chat from "./Chat.jsx";
import { fetchComments, addComment, editComment } from "@/utils/productChatApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInfiniteScroll } from "@/hooks/useComments";
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

export default function ItemChat({ initialComments, id }) {
  const [input, setInput] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const queryClient = useQueryClient();

  const hasToastShownRef = useRef(false);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", id],
      queryFn: ({ pageParam }) => fetchComments(id, pageParam),
      initialData: {
        pages: initialComments ? [initialComments] : [],
        pageParams: [undefined],
      },
      getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
      onSettled: () => {
        hasToastShownRef.current = false;
      },
    });

  useEffect(() => {
    setFormValid(input.trim().length > 0);
  }, [input]);

  const addCommentMutation = useMutation({
    mutationFn: (newComment) => addComment(id, newComment),
    onSuccess: (addedComment) => {
      queryClient.setQueryData(["comments", id], (oldData) => {
        if (!oldData)
          return { pages: [{ list: [addedComment] }], pageParams: [] };

        return {
          ...oldData,
          pages: oldData.pages.map((page, index) =>
            index === 0 ? { ...page, list: [addedComment, ...page.list] } : page
          ),
        };
      });
      setInput("");
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: (updatedComment) => editComment(currentEditId, updatedComment),
    onSuccess: (editedComment) => {
      queryClient.setQueryData(["comments", id], (oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            list: page.list.map((comment) =>
              comment.id === currentEditId ? editedComment : comment
            ),
          })),
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

  const handleSubmit = (e) => {
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

  const handleEdit = (comment) => {
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
        comments={data?.pages?.flatMap((page) => page.list) || []}
        onEdit={handleEdit}
      />
    </>
  );
}
