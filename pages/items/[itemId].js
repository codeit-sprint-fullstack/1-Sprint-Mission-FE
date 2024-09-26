// items/[itemId].js
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "../../styles/ItemDetail.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import {
  fetchProductById,
  fetchProductComments,
  postProductComment,
  deleteComment,
  postProductFavorite,
  deleteProductFavorite,
} from "../../api";

const ItemDetail = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [newComment, setNewComment] = useState("");
  const [cursor, setCursor] = useState(null);
  const COMMENTS_PER_PAGE = 10;

  const queryClient = useQueryClient();

  const {
    data: itemData,
    error: itemError,
    isLoading: itemLoading,
  } = useQuery({
    queryKey: ["product", itemId],
    queryFn: () => fetchProductById(itemId),
    enabled: !!itemId,
  });

  const {
    data: commentsData,
    error: commentsError,
    isLoading: commentsLoading,
  } = useQuery({
    queryKey: ["productComments", itemId, { limit: COMMENTS_PER_PAGE, cursor }],
    queryFn: () =>
      fetchProductComments(itemId, {
        limit: COMMENTS_PER_PAGE,
        cursor,
      }),
    enabled: !!itemId,
  });

  //댓글 작성 뮤테이션
  const postCommentMutation = useMutation({
    mutationFn: ({ productId, content }) =>
      postProductComment({ productId, content }),
    onSuccess: () => {
      setNewComment("");
      queryClient.invalidateQueries(["productComments", itemId]);
    },
  });

  //댓글 삭제 뮤테이션
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["productComments", itemId]);
    },
  });

  //상품 좋아요 추가 뮤테이션
  const postFavoriteMutation = useMutation({
    mutationFn: () => postProductFavorite(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["product", itemId]);
    },
  });

  //상품 좋아요 취소 뮤테이션
  const deleteFavoriteMutation = useMutation({
    mutationFn: () => deleteProductFavorite(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["product", itemId]);
    },
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    postCommentMutation.mutate({ productId: itemId, content: newComment });
  };

  const handleCommentDelete = (commentId) => {
    deleteCommentMutation.mutate(commentId);
  };

  const handleFavorite = () => {
    if (itemData.isFavorite) {
      deleteFavoriteMutation.mutate();
    } else {
      postFavoriteMutation.mutate();
    }
  };

  const loadMoreComments = () => {
    if (commentsData && commentsData.nextCursor) {
      setCursor(commentsData.nextCursor);
    }
  };

  if (itemLoading || commentsLoading) return <div>로딩 중...</div>;
  if (itemError || commentsError)
    return <div>에러 발생: {(itemError || commentsError).message}</div>;
  if (!itemData) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div>
      <Nav />
      <div className={styles.container}>
        {/* 상품 정보 표시 부분 */}
        <h1>{itemData.name}</h1>
        {/* ... 기타 상품 정보 표시 */}
        <button onClick={handleFavorite}>
          {itemData.isFavorite ? "좋아요 취소" : "좋아요"}
        </button>

        <div className={styles.commentSection}>
          <h2>댓글</h2>
          <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
              className={styles.commentInput}
            />
            <button type="submit" className={styles.commentSubmit}>
              등록
            </button>
          </form>
          <div className={styles.comments}>
            {commentsData &&
              commentsData.list.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                  <p className={styles.commentContent}>{comment.content}</p>
                  <p className={styles.commentMeta}>
                    {comment.writer.nickname} -{" "}
                    {new Date(comment.createdAt).toLocaleString()}
                    <button
                      onClick={() => handleCommentDelete(comment.id)}
                      className={styles.commentDelete}
                    >
                      삭제
                    </button>
                  </p>
                </div>
              ))}
          </div>
          {commentsData && commentsData.nextCursor && (
            <button
              onClick={loadMoreComments}
              className={styles.loadMoreButton}
            >
              더 보기
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetail;
