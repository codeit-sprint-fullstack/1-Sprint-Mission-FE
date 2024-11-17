import React, { memo } from "react";
import { formatDate } from "@/utils/dateUtils";
import styles from "./index.module.css";

const ProductMetadata = memo(({ product, handleFavorite }) => {
  return (
    <div className={styles.metadata}>
      <div className={styles.profileMetaHug}>
        <img src="/images/ic_profile.svg" alt="프로필" width={40} height={40} />
        <div className={styles.nameDateHug}>
          <span className={styles.seller}>{product.ownerId}번 판다</span>
          <span className={styles.date}>{formatDate(product.createdAt)}</span>
        </div>
      </div>
      <div className={styles.favoriteButtonWrapper}>
        <button
          onClick={handleFavorite}
          className={`${styles.favoriteButton} ${
            product.isFavorite ? styles.favoriteActive : ""
          }`}
          aria-label={product.isFavorite ? "찜 취소하기" : "찜하기"}
        >
          <img
            src={
              product.isFavorite
                ? "/images/ic_heartToggleActive.svg"
                : "/images/ic_heart.svg"
            }
            alt={product.isFavorite ? "찜 취소" : "찜하기"}
            width={24}
            height={24}
          />
          <span>{product.favoriteCount}</span>
        </button>
      </div>
    </div>
  );
});

ProductMetadata.displayName = "ProductMetadata";

export default ProductMetadata;
