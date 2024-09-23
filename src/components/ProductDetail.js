import React, { useEffect, useState } from "react";
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
  toggleFavorite, // 좋아요 API
} from "../api/api"; // API 호출 추가

export default function ProductDetail({ productId }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommentButtonEnabled, setIsCommentButtonEnabled] = useState(false);
  const [comments, setComments] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 삭제 확인 모달 상태

  // 상품 데이터 가져오기
  const getProductDetails = async () => {
    try {
      const data = await fetchProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error("상품 상세 조회 실패:", error);
    }
  };

  // 댓글 데이터 가져오기
  const getComments = async () => {
    try {
      const data = await fetchCommentsByProductId(productId, 3);
      setComments(data.list);
    } catch (error) {
      console.error("댓글 목록 조회 실패:", error);
    }
  };

  useEffect(() => {
    getProductDetails();
    getComments();
  }, [productId]);

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

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = () => {
    setShowConfirmModal(true); // 모달 열기
  };

  // 모달에서 취소 버튼 클릭 핸들러
  const handleCancel = () => {
    setShowConfirmModal(false); // 모달 닫기
  };

  // 댓글 입력 핸들러
  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);
    setIsCommentButtonEnabled(value.trim().length > 0);
  };

  // 댓글 등록 핸들러
  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const commentData = {
          content: comment,
          author: "작성자 판다",
          createdAt: new Date().toISOString(),
        };
        await createCommentForProduct(product.id, commentData);
        setComments((prevComments) => [...prevComments, commentData]);
        setComment("");
        setIsCommentButtonEnabled(false);
      } catch (error) {
        console.error("댓글 등록 실패:", error);
      }
    }
  };

  // 수정 페이지로 이동하는 핸들러
  const handleEditRedirect = () => {
    router.push(`/product-edit/${product.id}`);
  };

  // 좋아요 핸들러
  const handleFavorite = async () => {
    if (!product) return;
    try {
      const method = product.isFavorite ? "DELETE" : "POST"; // 현재 상태에 따라 메서드 설정
      const updatedProduct = await toggleFavorite(product.id, method);
      console.log("업데이트된 상품 데이터:", updatedProduct);

      // 여기에서 favoriteCount를 기존 값에 +1 또는 -1 해주기
      setProduct((prevProduct) => ({
        ...prevProduct,
        isFavorite: !prevProduct.isFavorite,
        favoriteCount: product.isFavorite
          ? prevProduct.favoriteCount - 1
          : prevProduct.favoriteCount + 1,
      }));
    } catch (error) {
      console.error("좋아요 실패:", error);
    }
  };

  if (!product) {
    return <div>상품 정보를 불러오는 데 실패했습니다.</div>;
  }

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
                <p className={styles.likeCount}>{product.favoriteCount}</p>
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
            onChange={handleCommentChange}
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
        <UpdateDeleteButton
          onEdit={handleEditRedirect}
          onDelete={handleDeleteClick} // 수정: 삭제 클릭 시 모달 열기
        />
      )}

      {/* 삭제 확인 모달 */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleCancel} // 취소 클릭 시 모달 닫기
        onConfirm={handleDelete} // 확인 클릭 시 삭제
      />

      <button className={styles.moreMenuButton} onClick={toggleMenu}>
        :
      </button>
    </div>
  );
}
