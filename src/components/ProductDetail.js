import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./ProductDetail.module.css";
import AuthorProfile from "../../public/images/profile-image.png";
import Heart from "../../public/images/ic_heart.png";
import img_default from "../../public/images/img_default.png";
import UpdateDeleteButton from "./UpdateDeleteButton"; // 수정/삭제 컴포넌트
import ConfirmationModal from "./ConfirmationModal"; // 상품 삭제 확인모달 컴포넌트
import { useRouter } from "next/router";
import {
  fetchProductById,
  deleteProduct,
  createCommentForProduct,
  fetchCommentsByProductId,
  toggleFavorite,
} from "../api/api"; // API 호출 추가
import { useQuery } from "@tanstack/react-query"; // react-query 추가
import Spinner from "./Spinner"; // Spinner 컴포넌트 import

export default function ProductDetail({ productId, onCommentSubmit }) {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommentButtonEnabled, setIsCommentButtonEnabled] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 삭제 확인 모달 상태
  const [favoriteCount, setFavoriteCount] = useState(0); // 좋아요 수 상태
  const [isFavorite, setIsFavorite] = useState(false); // 좋아요 상태
  const menuRef = useRef(null);

  // 상품 데이터 가져오기
  const {
    data: product,
    error: productError,
    isLoading: productLoading,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
    onSuccess: (data) => {
      setFavoriteCount(data.favoriteCount);
      setIsFavorite(data.isFavorite);
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
      await deleteProduct(product.id);
      router.push("/items"); // 삭제 후, 상품 리스트 페이지로 이동
    } catch (error) {
      console.error("상품 삭제 실패:", error);
    }
  };

  // 댓글 등록 핸들러
  const handleCommentSubmit = async () => {
    if (comment.trim() && product) {
      await onCommentSubmit(comment); // props로 받은 댓글 등록 핸들러 호출
      setComment(""); // 댓글 입력 초기화
      setIsCommentButtonEnabled(false); // 버튼 비활성화
    }
  };

  // 좋아요 핸들러
  const handleFavorite = async () => {
    if (!product) return;
    const method = isFavorite ? "DELETE" : "POST";

    try {
      await toggleFavorite(product.id, method);
      setFavoriteCount((prevCount) =>
        isFavorite ? prevCount - 1 : prevCount + 1
      );
      setIsFavorite((prevState) => !prevState); // 상태 토글
    } catch (error) {
      console.error("좋아요 실패:", error);
      alert("좋아요 요청에 실패했습니다."); // 기본 에러 메시지
    }
  };

  // 로딩 및 에러 처리
  if (productLoading) return <Spinner />;
  if (productError || commentsError)
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
      <div className={styles.productHeaderContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={product.images.length > 0 ? product.images[0] : img_default}
            alt="상품 이미지"
            width={486}
            height={486}
            className={styles.productImage}
          />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productTitleMenu}>
            <h3 className={styles.productTitle}>{product.name}</h3>
            <button className={styles.moreMenuButton} onClick={toggleMenu}>
              :
            </button>
          </div>
          <h4 className={styles.productPrice}>{product.price}원</h4>
          <div className={styles.productIntroContainer}>
            <p className={styles.productIntroduction}>상품 소개</p>
            <p className={styles.productDescription}>{product.description}</p>
          </div>
          <div className={styles.productTags}>
            <p className={styles.tagsmungoo}>상품 태그</p>
            <div className={styles.tagsContainer}>
              {product.tags.map((tag, index) => (
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
                <span className={styles.authorName}>{product.author}</span>
                <span className={styles.postDate}>
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className={styles.likeContainer}>
              <button onClick={handleFavorite} className={styles.likeButton}>
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
            onEdit={() => router.push(`/product-edit/${product.id}`)} // 수정 페이지로 이동
            onDelete={() => setShowConfirmModal(true)} // 삭제 확인 모달 열기
          />
        </div>
      )}

      {/* 삭제 확인 모달 */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)} // 취소 클릭 시 모달 닫기
        onConfirm={handleDelete} // 확인 클릭 시 삭제
      />
    </div>
  );
}
