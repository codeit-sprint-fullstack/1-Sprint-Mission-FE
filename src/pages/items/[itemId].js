import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  getProductById,
  favoriteProduct,
  unfavoriteProduct,
} from "../../api/productApi";
import { getComments } from "../../api/commentApi";
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
      const data = await getComments(itemId);
      console.log("불러온 댓글 데이터:", data); // 서버에서 댓글 데이터를 받아온 직후에 로그
      setComments(data.list || []);
    } catch (error) {
      console.error("댓글 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (itemId) {
      loadComments(); // 서버에서 댓글 데이터를 불러옴
      console.log("loadComments 호출됨, itemId:", itemId); // useEffect가 실행될 때마다 로그
    }
  }, [itemId]); // itemId가 변경될 때마다 실행

  // 댓글 상태가 업데이트될 때마다 로그 출력하는 useEffect
  useEffect(() => {
    console.log("댓글 상태가 업데이트되었습니다:", comments); // comments 상태가 변경될 때마다 로그 출력
  }, [comments]); // comments 상태가 변경될 때마다 실행

  const likeMutation = useMutation({
    mutationFn: isLiked
      ? () => unfavoriteProduct(itemId, accessToken)
      : () => favoriteProduct(itemId, accessToken),
    onSuccess: () => {
      setIsLiked(!isLiked);
      productData.favoriteCount = isLiked
        ? productData.favoriteCount - 1
        : productData.favoriteCount + 1;
    },
    onError: () => {
      setModalMessage("좋아요 처리 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    },
  });

  const handleLikeToggle = () => {
    if (accessToken) {
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

  console.log("Product Images:", productData?.image); // image 필드 확인

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
                author={comment.writer?.nickname || "푸바오"}
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
