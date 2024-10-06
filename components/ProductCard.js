import styles from "@/styles/ProductCard.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/items/${product.id}`} className={styles.productCard}>
      <div className={styles.productCardContent}>
        <Image
          src={product.images[0]}
          width={220}
          height={220}
          priority
          alt="product_image"
        />
        <p className={styles.productCardName}>{product.name}</p>
        <p className={styles.productCardPrice}>
          {product.price.toLocaleString("en-US") + "원"}
        </p>
        <div className={styles.productCardfavoriteContainer}>
          <Image
            src="/ic_heart.png"
            alt="heart_icon"
            className={styles.heartImg}
            width={16}
            height={16}
          />
          <p className={styles.productCardFavoriteCount}>
            {product.favoriteCount}
          </p>
        </div>
      </div>
    </Link>
  );
}
