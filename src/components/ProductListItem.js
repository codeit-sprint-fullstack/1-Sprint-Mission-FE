import React, { useState } from "react";
import styles from "./ProductListItem.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

const defaultImage = "/images/img_default.png";

export default function ProductListItem({ product }) {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState(() => {
    return product.images && product.images.length > 0
      ? product.images[0]
      : defaultImage;
  });

  console.log("사용되는 이미지 URL:", imageSrc); // 현재 사용 중인 이미지 URL 출력

  const handleClick = () => {
    router.push(`/items/${product.id}`);
  };

  return (
    <div
      className={styles.productCard}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && handleClick()}
    >
      <Image
        src={imageSrc}
        alt={product.name}
        width={200}
        height={200}
        className={styles.productImage}
        onError={() => setImageSrc(defaultImage)}
      />
      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>
          {product.price.toLocaleString()}원
        </p>
        <p className={styles.productFavorite}>
          💙 좋아요 {product.favoriteCount}
        </p>
      </div>
    </div>
  );
}
