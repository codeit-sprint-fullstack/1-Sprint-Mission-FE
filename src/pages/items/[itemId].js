import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getProductById,
  favoriteProduct,
  unfavoriteProduct,
} from "../../api/productApi";
import { getComments } from "../../api/commentApi";
import Modal from "../../components/Modal";
import ProductCommentForm from "../../components/ProductCommentForm";
import ProductCommentItem from "../../components/ProductCommentItem";
import ProductEmptyComments from "../../components/ProductEmptyComments";
import ProductBackButton from "../../components/ProductBackButton";
import styles from "../../styles/itemDetail.module.css";
import { useState, useEffect } from "react";

const ProductDetailPage = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);

  // 페이지가 로드될 때 accessToken을 localStorage에서 가져옴
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setAccessToken(token);
    }
  }, []);

  // 상품 정보 가져오기 (서버에서 좋아요 수 포함)
  const { data: productData, error: productError } = useQuery({
    queryKey: ["product", itemId],
    queryFn: () => getProductById(itemId),
    enabled: !!itemId,
    onSuccess: (data) => {
      setIsLiked(data.isFavorited); // 초기 좋아요 상태 설정
    },
  });

  // 댓글 목록 불러오기
  useEffect(() => {
    if (itemId) {
      const loadComments = async () => {
        try {
          const data = await getComments(itemId); // 서버에서 댓글 목록 불러오기
          setComments(data.list || []); // 댓글 목록 상태 업데이트
        } catch (error) {
          console.error("댓글 목록 불러오기 실패:", error);
        }
      };
      loadComments();
    }
  }, [itemId]);

  // 좋아요 토글
  const likeMutation = useMutation({
    mutationFn: isLiked
      ? () => unfavoriteProduct(itemId, accessToken) // 좋아요 취소
      : () => favoriteProduct(itemId, accessToken), // 좋아요
    onSuccess: () => {
      setIsLiked(!isLiked); // 좋아요 상태 토글
      productData.favoriteCount = isLiked
        ? productData.favoriteCount - 1
        : productData.favoriteCount + 1; // 좋아요 갯수 업데이트
    },
    onError: () => {
      setModalMessage("좋아요 처리 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    },
  });

  // 좋아요 버튼 클릭 시 처리
  const handleLikeToggle = () => {
    if (accessToken) {
      likeMutation.mutate();
    } else {
      setModalMessage("로그인이 필요합니다.");
      setIsModalOpen(true);
    }
  };

  // 새로운 댓글을 추가하는 함수
  const addNewComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  if (productError) return <p>상품 정보를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div>
      <div className={styles.itemDetail}>
        <img
          src={productData?.images[0]}
          alt={productData?.name}
          className={styles.image}
        />

        <div className={styles.infoContainer}>
          <div className={`${styles.infoBox} ${styles.firstBox}`}>
            <div className={styles.namePriceContainer}>
              <span className={styles.name}>{productData?.name}</span>
              <img
                src="/image/kebab.svg"
                alt="Kebab Icon"
                className={styles.kebabIcon}
              />
            </div>
            <div>
              <span className={styles.price}>
                {productData?.price.toLocaleString("ko-KR")}원
              </span>
            </div>
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
            <span className={styles.ownerId}>
              {productData?.ownerId}번 바오
            </span>
            <span className={styles.createdAt}>
              {new Date(productData?.createdAt).toLocaleDateString()}
            </span>
            <img
              src="/image/line.svg"
              alt="Line Icon"
              className={styles.lineIcon}
            />

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
                author={comment.writer?.nickname || "푸바오"} // 다른 유저의 닉네임을 출력
                refreshComments={() => {}}
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
    </div>
  );
};

export default ProductDetailPage;

