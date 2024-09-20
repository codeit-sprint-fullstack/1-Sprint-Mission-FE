import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ProductDetail.module.css";
import AuthorProfile from "../../public/images/profile-image.png";
import Heart from "../../public/images/ic_heart.png";
import img_default from "../../public/images/img_default.png";
import UpdateDeleteButton from "./UpdateDeleteButton"; // 수정/삭제 컴포넌트
import { useRouter } from "next/router";
import {
  fetchProductById,
  deleteProduct,
  createComment,
  fetchComments,
} from "../api/api"; // API 호출 추가

export default function ProductDetail({ productId }) {
  console.log("productId:", productId);
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommentButtonEnabled, setIsCommentButtonEnabled] = useState(false);
  const [comments, setComments] = useState([]);

  // 상품 데이터 가져오기
  const getProductDetails = async () => {
    try {
      const data = await fetchProductById(productId);
      console.log("상품 데이터:", data);
      setProduct(data);
    } catch (error) {
      console.error("상품 상세 조회 실패:", error);
    }
  };

  // 댓글 데이터 가져오기
  const getComments = async () => {
    try {
      const data = await fetchComments();
      setComments(data);
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

  // 댓글 입력 핸들러
  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);
    setIsCommentButtonEnabled(value.trim().length > 0); // 입력값이 있으면 버튼 활성화
  };

  // 댓글 등록 핸들러
  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const commentData = {
          productId: product.id, // 상품 ID
          content: comment,
          author: "작성자 판다",
          createdAt: new Date().toISOString(),
        };
        await createComment(commentData); // 댓글 등록 API 호출
        setComment(""); // 입력 필드 초기화
        setIsCommentButtonEnabled(false); // 버튼 비활성화
        getComments(); // 댓글 목록 새로고침
      } catch (error) {
        console.error("댓글 등록 실패:", error);
      }
    }
  };

  // 수정 페이지로 이동하는 핸들러
  //   const handleEditRedirect = () => {
  //     router.push(/product-edit/${product.id});
  //   };

  if (!product) {
    return <div>상품 정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className={styles.productDetailItem}>
      <div className={styles.productHeaderContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={img_default}
            alt="상품 이미지"
            width={486}
            height={486}
            className={styles.productImage}
          />
        </div>
        <div className={styles.productInfo}>
          <h3 className={styles.productTitle}>{product.name}</h3>
          <h4 className={styles.productPrice}>{product.price}원</h4>
          <div className={styles.productIntroContainer}>
            <p className={styles.productIntroduction}>상품 소개</p>
            <p className={styles.productDescription}>{product.description}</p>
          </div>
          <div className={styles.productTags}>
            <p className={styles.tagsmungoo}>상품 태그</p>
            <p className={styles.tags}>{product.tags.join(", ")}</p>
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
            <div className={styles.likeCount}>
              <Image
                src={Heart}
                alt="Heart"
                className={styles.heartIcon}
                width={26.8}
                height={23.3}
              />
              {product.likeCount}
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
            placeholder="개인정보를 공유 및 요청하거나 명예훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제 될 수 있습니다."
          />
        </label>
        <button
          className={styles.registrationBtn}
          onClick={handleCommentSubmit}
          disabled={!isCommentButtonEnabled}
        >
          등록
        </button>
      </div>

      {/* 댓글 목록 */}
      <div className={styles.commentsSection}>
        {comments.map((c) => (
          <div key={c.id} className={styles.commentItem}>
            <span>
              {c.author}: {c.content}
            </span>
          </div>
        ))}
      </div>

      {/* 수정/삭제 메뉴 */}
      {menuVisible && (
        <UpdateDeleteButton
          onEdit={handleEditRedirect}
          onDelete={handleDelete}
        />
      )}
      <button className={styles.moreMenuButton} onClick={toggleMenu}>
        :
      </button>
    </div>
  );
}
