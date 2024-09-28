import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "../../styles/ItemDetail.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import CommentOptions from "../../components/CommentOptions";
import ProductOptions from "../../components/ProductOptions";
import {
  fetchProductById,
  fetchProductComments,
  fetchCurrentUser,
  postProductComment,
  deleteComment,
  editComment,
  editProduct,
  deleteProduct,
  postProductFavorite,
  deleteProductFavorite,
} from "../../api/api";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

const ItemDetail = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [newComment, setNewComment] = useState("");
  const [cursor, setCursor] = useState(null);
  const COMMENTS_PER_PAGE = 10;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const {
    data: currentUser,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
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

  const editCommentMutation = useMutation({
    mutationFn: ({ commentId, newContent }) =>
      editComment(commentId, newContent),
    onSuccess: () => {
      queryClient.invalidateQueries(["productComments", itemId]);
    },
  });

  const editProductMutation = useMutation({
    mutationFn: ({ productId, productData }) =>
      editProduct(productId, productData),
    onSuccess: () => {
      queryClient.invalidateQueries(["product", itemId]);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId) => deleteProduct(productId),
    onSuccess: () => {
      router.push("/items");
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

  const handleCommentEdit = (commentId, newContent) => {
    if (newContent) {
      editCommentMutation.mutate({ commentId, newContent });
    }
  };

  const handleProductEdit = (productId, productData) => {
    editProductMutation.mutate({ productId, productData });
  };

  const handleProductDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteProductMutation.mutate(itemId);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
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
      console.log("상품명:", itemData.name);
      console.log("판매가격:", itemData.price);
      console.log("상품소개:", itemData.description);
      console.log("태그:", itemData.tags);
      console.log("외부 이미지 URL:", itemData.images);
    }
  }, [itemData]);

  if (itemLoading || commentsLoading || userLoading)
    return <div>로딩 중...</div>;
  if (itemError || commentsError || userError)
    return (
      <div>에러 발생: {(itemError || commentsError || userError).message}</div>
    );
  if (!itemData) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div>
      <Nav />
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.imageGallery}>
            {/* 이미지가 있을 때만 렌더링 */}
            {itemData.images.length > 0 && (
              <img
                src={itemData.images[0]}
                alt={itemData.name}
                width="486"
                height="486"
                className={styles.mainImage}
              />
            )}
          </div>

          <div className={styles.itemInfo}>
            <div className={styles.itemHeader}>
              <h1 className={styles.itemName}>{itemData.name}</h1>
              <div className={styles.productOptions}>
                <ProductOptions
                  product={itemData}
                  currentUser={currentUser}
                  onEdit={handleProductEdit}
                  onDelete={handleProductDelete}
                />
              </div>
            </div>

            <p className={styles.itemPrice}>
              {itemData.price.toLocaleString()}원
            </p>
            <button
              onClick={handleFavorite}
              className={`${styles.favoriteButton} ${
                itemData.isFavorite ? styles.favoriteButtonActive : ""
              }`}
            >
              <img
                src={
                  itemData.isFavorite ? "/product_reply.svg" : "/ic_heart.png"
                }
                alt="좋아요"
                width="26.8"
                height="23.3"
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
              <img
                src="/Img_inquiry_empty.png"
                alt="댓글 없음"
                width="200"
                height="200"
              />
              <p>아직 댓글이 없습니다.</p>
            </div>
          ) : (
            <div className={styles.CommentOptions}>
              <CommentOptions
                comments={commentsData.list}
                currentUser={currentUser}
                onEdit={handleCommentEdit}
                onDelete={handleCommentDelete}
              />
            </div>
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
          <img
            src="/btn_medium.png"
            alt="목록으로 돌아가기"
            width="240"
            height="48"
          />
        </button>
        {showDeleteModal && (
          <DeleteConfirmModal
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetail;
