import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  getProductById,
  favoriteProduct,
  unfavoriteProduct,
} from "../../api/productApi";
import { getProductComments } from "../../api/commentApi";
import { getAccessToken } from "../../api/authApi";
import Modal from "../../components/Modal";
import ProductCommentForm from "../../components/ProductCommentForm";
import ProductCommentItem from "../../components/ProductCommentItem";
import ProductEmptyComments from "../../components/ProductEmptyComments";
import ProductBackButton from "../../components/ProductBackButton";
import ProductKebabMenu from "../../components/ProductKebabMenu";
import ProductEditModal from "../../components/ProductEditModal";
import styles from "../../styles/itemDetail.module.css";
import { ProductData, ProductResponse } from "../../api/productApi";
import { CommentResponse } from "../../types/commonTypes";

const ProductDetailPage = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Partial<ProductData>>({
    name: "",
    price: 0,
    description: "",
    tags: [],
  });

  useEffect(() => {
    const token = getAccessToken();
    setAccessToken(token);
  }, []);

  const {
    data: productData,
    error: productError,
    isLoading: isProductLoading,
  } = useQuery<ProductResponse>({
    queryKey: ["product", itemId],
    queryFn: () => getProductById(Number(itemId)),
    enabled: !!itemId,
  });

  const loadComments = async () => {
    try {
      const data: CommentResponse[] = await getProductComments(Number(itemId));
      const sortedComments = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setComments(sortedComments);
    } catch (error) {
      console.error("댓글 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (itemId) loadComments();
  }, [itemId]);

  const likeMutation = useMutation({
    mutationFn: isLiked
      ? () => unfavoriteProduct(Number(itemId))
      : () => favoriteProduct(Number(itemId)),
    onSuccess: () => {
      setIsLiked(!isLiked);
      if (productData) {
        const likesCount = isLiked
          ? productData.likes.length - 1
          : productData.likes.length + 1;
      }
    },
    onError: (error: any) => {
      setModalMessage("좋아요 처리 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    },
  });

  const handleLikeToggle = () => {
    if (accessToken) likeMutation.mutate();
    else {
      setModalMessage("로그인이 필요합니다.");
      setIsModalOpen(true);
    }
  };

  const addNewComment = (comment: CommentResponse) => {
    setComments([comment, ...comments]);
  };

  if (productError) return <p>상품 정보를 불러오는 중 오류가 발생했습니다.</p>;

  if (!productData) return <p>상품 정보가 없습니다.</p>;

  return (
    <div>
      <div className={styles.itemDetail}>
        {productData.images.length > 0 ? (
          <img
            src={productData.images[0]}
            alt={productData?.name}
            className={styles.image}
          />
        ) : (
          <p>이미지가 없습니다.</p>
        )}
        <div className={styles.infoContainer}>
          <div className={`${styles.infoBox} ${styles.firstBox}`}>
            <div className={styles.namePriceContainer}>
              <span className={styles.name}>{productData?.name}</span>
              <ProductKebabMenu
                productId={Number(itemId)}
                productData={productData}
                onEdit={() => setShowEditModal(true)}
                onProductUpdate={(updatedProduct: ProductData) => {
                  setEditedProduct(updatedProduct);
                }}
                refreshProducts={async () => {
                  router.push("/items");
                  return true;
                }}
              />
            </div>
            <span className={styles.price}>
              {productData?.price.toLocaleString("ko-KR")}원
            </span>
          </div>

          <div className={`${styles.infoBox} ${styles.secondBox}`}>
            <div className={styles.descriptionTitle}>상품 소개</div>
            <div className={styles.descriptionContent}>
              {productData?.description}
            </div>
          </div>

          <div className={`${styles.infoBox} ${styles.thirdBox}`}>
            <div className={styles.tagTitle}>상품 태그</div>
            <div className={styles.tags}>
              {productData?.tags?.map((tag: string, index: number) => (
                <span key={index} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className={`${styles.infoBox} ${styles.fourthBox}`}>
            <img
              src="/image/profile.svg"
              alt="Profile"
              className={styles.profileIcon}
            />
            <span className={styles.ownerId}>{productData?.user.nickname}번 바오</span>
            <span className={styles.createdAt}>
              {productData?.createdAt
                ? new Date(productData.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
            <img
              src={isLiked ? "/image/heart_filled.svg" : "/image/heart.svg"}
              alt="Heart Icon"
              className={styles.heartIcon}
              onClick={handleLikeToggle}
              style={{ cursor: "pointer" }}
            />
            <span className={styles.favoriteCount}>
              {productData?.likes.length || 0}{" "}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.commentsSection}>
        <ProductCommentForm
          productId={Number(itemId)}
          addNewComment={addNewComment}
        />

        <div className={styles.commentsContainer}>
          {comments.length === 0 ? (
            <ProductEmptyComments />
          ) : (
            comments.map((comment) => (
              <ProductCommentItem
                key={comment.id}
                productId={Number(itemId)}
                id={comment.id}
                content={comment.content}
                createdAt={comment.createdAt}
                author={comment.user?.nickname || "푸바오"}
                refreshComments={loadComments}
              />
            ))
          )}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <ProductBackButton />
      </div>

      {isModalOpen && (
        <Modal message={modalMessage} onConfirm={() => setIsModalOpen(false)} />
      )}

      {showEditModal && productData && (
        <ProductEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          productData={{ ...productData, images: productData.images }}
          onProductUpdate={(updatedProduct) => setEditedProduct(updatedProduct)}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
