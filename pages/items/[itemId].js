// pages/items/[itemId].js

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "../../styles/ItemDetail.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import CommentOptions from "../../components/CommentOptions"; // 2.1. CommentOptions 컴포넌트 임포트
import {
  fetchProductById,
  fetchProductComments,
  postProductComment,
  deleteComment,
  editComment, // 2.5. editComment 함수 임포트
  postProductFavorite,
  deleteProductFavorite,
} from "../../api/api";

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

  const postCommentMutation = useMutation({
    mutationFn: ({ productId, content }) =>
      postProductComment({ productId, content }),
    onSuccess: () => {
      setNewComment("");
      queryClient.invalidateQueries(["productComments", itemId]);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["productComments", itemId]);
    },
  });

  // 2.4. editCommentMutation 추가
  const editCommentMutation = useMutation({
    mutationFn: ({ commentId, newContent }) =>
      editComment(commentId, newContent),
    onSuccess: () => {
      queryClient.invalidateQueries(["productComments", itemId]);
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: () =>
      itemData.isFavorite
        ? deleteProductFavorite(itemId)
        : postProductFavorite(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["product", itemId]);
    },
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    postCommentMutation.mutate({
      productId: itemId,
      content: newComment,
    });
  };

  const handleCommentDelete = (commentId) => {
    deleteCommentMutation.mutate(commentId);
  };

  // 2.3. handleCommentEdit 함수 추가
  const handleCommentEdit = (commentId) => {
    const newContent = prompt("새로운 댓글 내용을 입력하세요:");
    if (newContent) {
      editCommentMutation.mutate({ commentId, newContent });
    }
  };

  const handleFavorite = () => {
    favoriteMutation.mutate();
  };

  const loadMoreComments = () => {
    if (commentsData && commentsData.nextCursor) {
      setCursor(commentsData.nextCursor);
    }
  };

  useEffect(() => {
    if (itemData) {
      console.log("Item Data:", itemData);
    }
  }, [itemData]);

  if (itemLoading || commentsLoading) return <div>로딩 중...</div>;
  if (itemError || commentsError)
    return <div>에러 발생: {(itemError || commentsError).message}</div>;
  if (!itemData) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div>
      <Nav />
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.imageGallery}>
            <Image
              src={itemData.images[0] || "/placeholder-image.jpg"}
              alt={itemData.name}
              width={486}
              height={486}
              className={styles.mainImage}
            />
          </div>

          <div className={styles.itemInfo}>
            <h1 className={styles.itemName}>{itemData.name}</h1>
            <p className={styles.itemPrice}>
              {itemData.price.toLocaleString()}원
            </p>
            <button
              onClick={handleFavorite}
              className={`${styles.favoriteButton} ${
                itemData.isFavorite ? styles.favoriteButtonActive : ""
              }`}
            >
              <Image
                src={
                  itemData.isFavorite ? "/product_reply.svg" : "/ic_heart.png"
                }
                alt="좋아요"
                width={26.8}
                height={23.3}
                className={styles.favoriteIcon}
              />
              {itemData.favoriteCount}
            </button>
            <p className={styles.itemDescription}>{itemData.description}</p>
            <div className={styles.itemTags}>
              {itemData.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.commentSection}>
          <h3>문의하기</h3>
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
          {commentsData && commentsData.list.length === 0 ? (
            <div className={styles.emptyComments}>
              <Image
                src="/Img_inquiry_empty.png"
                alt="댓글 없음"
                width={200}
                height={200}
              />
              <p>아직 댓글이 없습니다.</p>
            </div>
          ) : (
            // 2.2. 댓글 렌더링 부분 수정
            <CommentOptions
              comments={commentsData.list}
              onEdit={handleCommentEdit}
              onDelete={handleCommentDelete}
            />
          )}
          {commentsData && commentsData.nextCursor && (
            <button
              onClick={loadMoreComments}
              className={styles.loadMoreButton}
            >
              더 보기
            </button>
          )}
        </div>
        <button
          onClick={() => router.push("/items")}
          className={styles.backToListButton}
        >
          <Image
            src="/btn_medium.png"
            alt="목록으로 돌아가기"
            width={240}
            height={48}
          />
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetail;
