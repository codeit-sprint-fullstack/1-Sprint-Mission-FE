import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./ProductDetail.module.css";
import AuthorProfile from "../../public/images/profile-image.png";
import Heart from "../../public/images/ic_heart.png";
import img_default from "../../public/images/img_default.png";
import UpdateDeleteButton from "./UpdateDeleteButton";
import ConfirmationModal from "./ConfirmationModal";
import { useRouter } from "next/router";
import {
  fetchProductById,
  deleteProduct,
  createCommentForProduct,
  fetchCommentsByProductId,
  toggleFavorite,
} from "../api/api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

export default function ProductDetail({ productId, onCommentSubmit }) {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommentButtonEnabled, setIsCommentButtonEnabled] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const menuRef = useRef(null);

  // 상품 데이터 가져오기
  const {
    data: productData,
    error: productError,
    isLoading: productLoading,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
    onSuccess: (data) => {
      setFavoriteCount(data.product.favoriteCount); // 수정된 부분
      setIsFavorite(data.product.isFavorite); // 수정된 부분
    },
  });

  // 댓글 데이터 가져오기
  const { data: comments, error: commentsError } = useQuery({
    queryKey: ["comments", productId],
    queryFn: () => fetchCommentsByProductId(productId, 3),
    enabled: !!productId,
  });

  const toggleMenu = () => setMenuVisible(!menuVisible);

  // 상품 삭제 핸들러
  const handleDelete = async () => {
    try {
      await deleteProduct(productData.product.id); // 수정된 부분
      router.push("/items");
    } catch (error) {
      console.error("상품 삭제 실패:", error);
      alert("상품 삭제에 실패했습니다."); // 사용자에게 에러 메시지 제공
    }
  };

  // 댓글 등록 핸들러
  const handleCommentSubmit = async () => {
    if (comment.trim() && productData) {
      // 수정된 부분
      await onCommentSubmit(comment);
      setComment("");
      setIsCommentButtonEnabled(false);
    }
  };

  // 좋아요 핸들러
  const handleFavorite = async () => {
    if (!productData) return; // 수정된 부분
    const method = isFavorite ? "DELETE" : "POST";

    try {
      await toggleFavorite(productData.product.id, method); // 수정된 부분
      setFavoriteCount((prevCount) =>
        isFavorite ? prevCount - 1 : prevCount + 1
      );
      setIsFavorite((prevState) => !prevState);
    } catch (error) {
      console.error("좋아요 실패:", error);
      alert("좋아요 요청에 실패했습니다.");
    }
  };

  // 로딩 및 에러 처리
  if (productLoading) return <Spinner />;
  if (productError || !productData)
    return <div>상품 정보를 불러오는 데 실패했습니다.</div>;

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <div className={styles.productDetailItem}>
      {productData && productData.product ? (
        <>
          <div className={styles.productHeaderContainer}>
            <div className={styles.imageContainer}>
              <Image
                src={
                  productData.product.images.length > 0
                    ? productData.product.images[0]
                    : img_default // 수정된 부분
                }
                alt="상품 이미지"
                width={486}
                height={486}
                className={styles.productImage}
              />
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productTitleMenu}>
                <h3 className={styles.productTitle}>
                  {productData.product.name}
                </h3>
                <button className={styles.moreMenuButton} onClick={toggleMenu}>
                  :
                </button>
              </div>
              <h4 className={styles.productPrice}>
                {productData.product.price}원
              </h4>
              <div className={styles.productIntroContainer}>
                <p className={styles.productIntroduction}>상품 소개</p>
                <p className={styles.productDescription}>
                  {productData.product.description}
                </p>
              </div>
              <div className={styles.productTags}>
                <p className={styles.tagsmungoo}>상품 태그</p>
                <div className={styles.tagsContainer}>
                  {productData.product.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.productFooter}>
                <div className={styles.authorInfo}>
                  <Image
                    src={AuthorProfile}
                    alt="Profile"
                    className={styles.profileImage}
                    width={40}
                    height={40}
                  />
                  <div className={styles.authorDate}>
                    <span className={styles.authorName}>
                      {productData.product.ownerNickname}
                    </span>
                    <span className={styles.postDate}>
                      {new Date(
                        productData.product.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className={styles.likeContainer}>
                  <button
                    onClick={handleFavorite}
                    className={styles.likeButton}
                  >
                    <Image
                      src={Heart}
                      alt="Heart"
                      className={styles.heartIcon}
                      width={26.8}
                      height={23.3}
                    />
                    <p className={styles.likeCount}>{favoriteCount}</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.productQuestion}>
            <h3 className={styles.commentDalkiH3}>문의하기</h3>
            <label className={styles.detailCommentContainer}>
              <textarea
                name="content"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setIsCommentButtonEnabled(e.target.value.trim().length > 0);
                }}
                className={styles.commentInput}
                placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              />
            </label>
            <div className={styles.registrationContainer}>
              <button
                className={styles.registrationBtn}
                onClick={handleCommentSubmit}
                disabled={!isCommentButtonEnabled}
              >
                등록
              </button>
            </div>
          </div>

          {/* 수정/삭제 메뉴 */}
          {menuVisible && (
            <div className={styles.menuContainer} ref={menuRef}>
              <UpdateDeleteButton
                onEdit={() =>
                  router.push(`/product-edit/${productData.product.id}`)
                } // 수정된 부분
                onDelete={() => setShowConfirmModal(true)}
              />
            </div>
          )}

          {/* 삭제 확인 모달 */}
          <ConfirmationModal
            isOpen={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={handleDelete}
          />
        </>
      ) : (
        <div>
          <Spinner />
        </div> // 로딩 상태 처리
      )}
    </div>
  );
}
