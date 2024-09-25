import React from "react";
import styles from "./ProductListItem.module.css"; // CSS 모듈 임포트
import { useRouter } from "next/router"; // Next.js Router 임포트
import Image from "next/image";

// 기본 이미지 파일 경로
const defaultImage = "/images/img_default.png";

export default function ProductListItem({ product }) {
  const router = useRouter();

  // 각 상품 클릭시, 상품 상세 페이지로 이동
  const handleClick = () => {
    router.push(`/items/${product.id}`);
  };

  // 상품 이미지 없는 경우, 기본이미지 사용
  const productImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : defaultImage;

  return (
    <div
      className={styles.productCard}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && handleClick()}
    >
      <Image
        src={productImage}
        alt={product.name}
        width={200}
        height={200}
        className={styles.productImage}
        onError={(e) => {
          e.target.src = defaultImage;
        }} // 이미지 로드 실패 시 기본 이미지 사용
      />
      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>{product.price}원</p>
        <p className={styles.productFavorite}>
          💙 좋아요 {product.favoriteCount}
        </p>
      </div>
    </div>
  );
}
