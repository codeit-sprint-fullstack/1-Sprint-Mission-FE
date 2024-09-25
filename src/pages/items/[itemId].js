import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getProductById, favoriteProduct, unfavoriteProduct, updateProduct } from "../../api/productApi";
import { getComments } from "../../api/commentApi";
import { getAccessToken } from "../../api/authApi";
import Modal from "../../components/Modal";
import ProductCommentForm from "../../components/ProductCommentForm";
import ProductCommentItem from "../../components/ProductCommentItem";
import ProductEmptyComments from "../../components/ProductEmptyComments";
import ProductBackButton from "../../components/ProductBackButton";
import ProductKebabMenu from "../../components/ProductKebabMenu";
import styles from "../../styles/itemDetail.module.css";

const ProductDetailPage = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    description: "",
    tags: [], // 태그 추가
  });

  // 페이지가 로드될 때 accessToken을 getAccessToken 함수로 가져옴
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getAccessToken(); // getAccessToken 함수 사용
      setAccessToken(token);
    }
  }, []);

  const { data: productData, error: productError } = useQuery({
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
    },
  });

  const loadComments = async () => {
    try {
      const data = await getComments(itemId);
      setComments(data.list || []);
    } catch (error) {
      console.error("댓글 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (itemId) {
      loadComments(); // 댓글 목록 불러오기
    }
  }, [itemId]);

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

  const updateProductMutation = useMutation({
    mutationFn: (updatedData) =>
      updateProduct(itemId, updatedData, accessToken),
    onSuccess: () => {
      setIsEditMode(false);
    },
    onError: () => {
      setModalMessage("상품 수정 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    },
  });

  const handleDeleteTag = (deleteTag) => {
    setEditedProduct({
      ...editedProduct,
      tags: editedProduct.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setEditedProduct({
        ...editedProduct,
        tags: [...editedProduct.tags, e.target.value.trim()],
      });
      e.target.value = "";
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = () => {
    updateProductMutation.mutate(editedProduct);
  };

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
              {isEditMode ? (
                <input
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) =>
                    setEditedProduct({ ...editedProduct, name: e.target.value })
                  }
                  className={styles.inputField}
                />
              ) : (
                <span className={styles.name}>{productData?.name}</span>
              )}

              <ProductKebabMenu
                productId={itemId}
                onEdit={toggleEditMode}
                refreshProducts={() => router.push("/items")}
              />
            </div>

            <div>
              {isEditMode ? (
                <input
                  type="number"
                  value={editedProduct.price}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      price: e.target.value,
                    })
                  }
                  className={styles.inputField}
                />
              ) : (
                <span className={styles.price}>
                  {productData?.price.toLocaleString("ko-KR")}원
                </span>
              )}
            </div>
          </div>

          <div className={`${styles.infoBox} ${styles.secondBox}`}>
            <div className={styles.descriptionTitle}>상품 소개</div>
            {isEditMode ? (
              <textarea
                value={editedProduct.description}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    description: e.target.value,
                  })
                }
                className={styles.textArea}
              />
            ) : (
              <div className={styles.descriptionContent}>
                {productData?.description}
              </div>
            )}
          </div>

          <div className={`${styles.infoBox} ${styles.thirdBox}`}>
            <div className={styles.tagTitle}>상품 태그</div>
            <div className={styles.tags}>
              {isEditMode ? (
                <>
                  <input
                    type="text"
                    onKeyPress={handleTagKeyPress}
                    placeholder="태그를 추가하세요 (Enter)"
                    className={styles.inputField}
                  />
                  <div>
                    {editedProduct.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        #{tag}{" "}
                        <button
                          type="button"
                          onClick={() => handleDeleteTag(tag)}
                        >
                          X
                        </button>
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                productData?.tags?.map((tag, index) => (
                  <span key={index} className={styles.tag}>#{tag}</span>
                ))
              )}
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
                author={comment.writer?.nickname || "푸바오"}
                refreshComments={loadComments} // 댓글 갱신 처리
              />
            ))
          )}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        {isEditMode ? (
          <>
            <button onClick={handleSave} className={styles.saveButton}>
              저장
            </button>
            <button onClick={toggleEditMode} className={styles.cancelButton}>
              취소
            </button>
          </>
        ) : (
          <ProductBackButton />
        )}
      </div>

      {isModalOpen && (
        <Modal message={modalMessage} onConfirm={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ProductDetailPage;

