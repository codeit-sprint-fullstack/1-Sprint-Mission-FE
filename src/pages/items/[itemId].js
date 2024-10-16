import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  getProductById,
  favoriteProduct,
  unfavoriteProduct,
} from "../../api/productApi";
import { getProductComments } from "../../api/commentApi"; // 상품에 대한 댓글 가져오는 함수로 변경
import { getAccessToken } from "../../api/authApi";
import Modal from "../../components/Modal";
import ProductCommentForm from "../../components/ProductCommentForm";
import ProductCommentItem from "../../components/ProductCommentItem";
import ProductEmptyComments from "../../components/ProductEmptyComments";
import ProductBackButton from "../../components/ProductBackButton";
import ProductKebabMenu from "../../components/ProductKebabMenu";
import ProductEditModal from "../../components/ProductEditModal";
import Spinner from "../../components/Spinner";
import styles from "../../styles/itemDetail.module.css";

const SERVER_URL = "https://baomarket.onrender.com";

const ProductDetailPage = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    description: "",
    tags: [],
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getAccessToken();
      setAccessToken(token);
    }
  }, []);

  const {
    data: productData,
    error: productError,
    isLoading: isProductLoading,
  } = useQuery({
    queryKey: ["product", itemId],
    queryFn: () => getProductById(itemId),
    enabled: !!itemId,
    onSuccess: (data) => {
      setIsLiked(data.isFavorited);
      setEditedProduct({
        name: data.name,
        price: data.price,
        description: data.description,
        tags: data.tags || [],
      });

      console.log("Product Data:", data); // 상품 데이터 확인용 로그
    },
  });

  const loadComments = async () => {
    try {
      const data = await getProductComments(itemId);
      console.log("불러온 댓글 데이터:", data);

      // 상태 업데이트 시 댓글을 최신순으로 정렬
      const sortedComments = (data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComments(sortedComments); // 정렬된 댓글 상태 업데이트
      console.log("setComments 후 comments 상태:", sortedComments);
    } catch (error) {
      console.error("댓글 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (itemId) {
      loadComments();
      console.log("loadComments 호출됨, itemId:", itemId);
    }
  }, [itemId]);

  useEffect(() => {
    console.log("댓글 상태가 업데이트되었습니다:", comments);
  }, [comments]);

  const likeMutation = useMutation({
    mutationFn: isLiked
      ? () => unfavoriteProduct(itemId, accessToken)
      : () => favoriteProduct(itemId, accessToken),
    onSuccess: () => {
      console.log("좋아요 요청 성공:", isLiked ? "좋아요 취소" : "좋아요 추가");
      setIsLiked(!isLiked);
      productData.favoriteCount = isLiked
        ? productData.favoriteCount - 1
        : productData.favoriteCount + 1;
    },
    onError: (error) => {
      console.error(
        "좋아요 처리 중 오류 발생:",
        error.response ? error.response.data : error.message
      );
      setModalMessage("좋아요 처리 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    },
  });

  const handleLikeToggle = () => {
    if (accessToken) {
      console.log(
        "좋아요 토글 요청, 현재 상태:",
        isLiked ? "좋아요 취소" : "좋아요 추가"
      );
      likeMutation.mutate();
    } else {
      setModalMessage("로그인이 필요합니다.");
      setIsModalOpen(true);
    }
  };

  const addNewComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  if (isProductLoading) {
    return <Spinner dataLoaded={!isProductLoading} />;
  }

  if (productError) return <p>상품 정보를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div>
      <div className={styles.itemDetail}>
        {productData?.image?.length > 0 ? (
          <img
            src={productData.image[0]}
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
                productId={itemId}
                productData={productData}
                onEdit={() => setShowEditModal(true)}
                onProductUpdate={(updatedProduct) =>
                  setEditedProduct(updatedProduct)
                }
                refreshProducts={() => router.push("/items")}
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
              {productData?.tags?.map((tag, index) => (
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
            <span className={styles.ownerId}>{productData?.userId}번 바오</span>
            <span className={styles.createdAt}>
              {new Date(productData?.createdAt).toLocaleDateString()}
            </span>
            <img
              src={isLiked ? "/image/heart_filled.svg" : "/image/heart.svg"}
              alt="Heart Icon"
              className={styles.heartIcon}
              onClick={handleLikeToggle}
              style={{ cursor: "pointer" }}
            />
            <span className={styles.favoriteCount}>
              {productData?.favoriteCount || 0}{" "}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.commentsSection}>
        <ProductCommentForm
          productId={itemId}
          accessToken={accessToken}
          addNewComment={addNewComment}
        />

        <div className={styles.commentsContainer}>
          {comments.length === 0 ? (
            <ProductEmptyComments />
          ) : (
            comments.map((comment) => (
              <ProductCommentItem
                key={comment.id}
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

      {showEditModal && (
        <ProductEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          productData={productData}
          onProductUpdate={(updatedProduct) => setEditedProduct(updatedProduct)}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
