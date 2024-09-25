import React, { useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "@/utils/commentAPI";
import styles from "./CommentSection.module.css";
import { useModal } from "@/contexts/ModalContext";
import CommentList from "./CommentList";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { COMMENTS_PER_PAGE } from "@/constants/pagination";
import Image from "next/image";
import noContentPanda from "@/public/images/Img_inquiry_empty.svg";

const CommentSection = ({ productId }) => {
  const queryClient = useQueryClient();
  const { showModal } = useModal();
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  const handleError = (error) => {
    console.error("에러 발생:", error);
    setError(error.message);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["comments", productId],
    ({ pageParam = 0 }) => getComments(productId, pageParam, COMMENTS_PER_PAGE),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      retry: 3,
      onError: handleError,
    }
  );

  useInfiniteScroll(fetchNextPage, hasNextPage);

  const addMutation = useMutation((content) => addComment(productId, content), {
    onSuccess: () => {
      queryClient.resetQueries(["comments", productId]);
      setNewComment("");
      setError("");
    },
    onError: handleError,
  });

  const updateMutation = useMutation(
    ({ commentId, content }) => updateComment(productId, commentId, content),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", productId]);
        setError("");
      },
      onError: handleError,
    }
  );

  const deleteMutation = useMutation(
    (commentId) => deleteComment(productId, commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", productId]);
        setError("");
      },
      onError: handleError,
    }
  );

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      addMutation.mutate(newComment);
    }
  };

  const handleUpdateComment = (commentId, content) => {
    if (content.trim()) {
      updateMutation.mutate({ commentId, content });
    }
  };

  const handleDeleteComment = (commentId) => {
    showModal({
      content: "정말로 이 댓글을 삭제하시겠습니까?",
      onConfirm: () => {
        deleteMutation.mutate(commentId);
      },
      confirmText: "삭제",
      cancelText: "취소",
    });
  };

  if (isLoading) return <div className={styles.loading}>댓글 로딩 중...</div>;
  if (isError) return <div className={styles.error}>{error}</div>;

  const comments = data?.pages.flatMap((page) => page.list) || [];

  return (
    <div className={styles.commentSection}>
      <h2>문의하기</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleAddComment} className={styles.commentForm}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          className={styles.commentInput}
          aria-label="새 댓글 입력"
        />
        <button
          type="submit"
          className={styles.button}
          disabled={addMutation.isLoading}
          aria-label="댓글 등록"
        >
          {addMutation.isLoading ? "추가 중..." : "등록"}
        </button>
      </form>
      {comments.length > 0 ? (
        <CommentList
          comments={comments}
          handleUpdateComment={handleUpdateComment}
          handleDeleteComment={handleDeleteComment}
          updateMutation={updateMutation}
          deleteMutation={deleteMutation}
        />
      ) : (
        <div className={styles.noComments}>
          <Image
            src={noContentPanda}
            alt="문의가 없는 판다"
            width={196}
            height={196}
          />
          <div className={styles.noCommentsText}>아직 문의가 없어요</div>
        </div>
      )}
      {isFetchingNextPage && (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
