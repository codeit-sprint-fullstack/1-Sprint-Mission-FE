import { useState, useEffect, useCallback } from "react";
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
} from "@tanstack/react-query";
import { Comment } from "@/types/Types";
// nextCursor?: number | null
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

  // useInfiniteQuery 사용
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      { list: Comment[]; nextCursor?: number | null },
      Error,
      any
    >({
      queryKey: ["comments", id],
      queryFn: ({ pageParam = null }) =>
        fetchComments(id, pageParam as number | null),
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
      initialPageParam: null,
      initialData: {
        pages: [initialComments], // 첫 번째 페이지로 초기 데이터 설정
        pageParams: [null], // 초기 페이지 파라미터 설정
      },
    });

  useEffect(() => {
    setFormValid(input.trim().length > 0);
  }, [input]);

  // 스크롤 이벤트를 통한 다음 페이지 로드 로직
  const loadMoreComments = useCallback(async () => {
    if (isFetchingNextPage) return; // 이미 다음 페이지를 가져오는 중이면 중복 호출 방지
    if (!hasNextPage) {
      toast.info("댓글을 모두 불러왔습니다.");
      return; // 더 이상 가져올 페이지가 없으면 종료
    }
    try {
      await fetchNextPage();
    } catch (error) {
      console.error("Error loading more comments:", error);
      toast.error("댓글을 불러오는 중 오류가 발생했습니다.");
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // useInfiniteScroll 훅 사용
  useInfiniteScroll({
    loadMore: loadMoreComments,
    hasMore: hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const addCommentMutation = useMutation({
    mutationFn: (newComment: { content: string }) => addComment(id, newComment),
    onSuccess: (addedComment) => {
      queryClient.setQueryData<{
        pages: { list: Comment[]; nextCursor?: number | null }[];
        pageParams: (number | null | undefined)[];
      }>(["comments", id], (oldData) => {
        if (!oldData) {
          return {
            pages: [
              { list: [addedComment], nextCursor: initialComments.nextCursor },
            ],
            pageParams: [undefined],
          };
        }

        return {
          ...oldData,
          pages: [
            // 최신 댓글을 첫 페이지에 추가하고, 나머지 페이지는 그대로 유지합니다.
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

  const editCommentMutation = useMutation({
    mutationFn: (updatedComment: { content: string }) =>
      editComment(currentEditId as number, updatedComment),
    onSuccess: (editedComment) => {
      queryClient.setQueryData<{
        pages: { list: Comment[]; nextCursor?: number | null }[];
        pageParams: (number | null | undefined)[];
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
        comments={data?.pages?.flatMap((page: any) => page.list) || []}
        onEdit={handleEdit}
      />
    </>
  );
}
