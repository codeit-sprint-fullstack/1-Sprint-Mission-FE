import Image from "next/image";
import styles from "./BestProducts.module.css"; // CSS 모듈 import

function BestProductItem({ product }) {
  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/images/img_default.png"; // 기본 이미지 경로

  console.log("Image Source:", imageSrc);

  return (
    <div className={styles.bestProductItemCard}>
      <Image
        src={imageSrc}
        alt={product.name}
        className={styles.bestProductImage}
        width={282}
        height={282}
        priority
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

export default BestProductItem;
