import Image from "next/image";
import icHeart from "../public/images/ic_heart.png";
import imgDefault from "../public/images/img_default.png";
import styles from "@/styles/products.module.css";
import Link from "next/link";

function Product({ itemValues, favorite }) {
  const { name, price, favoriteCount, id, images } = itemValues;
  const numFormat = price.toLocaleString();

  const imageUrl =
    images.length > 0
      ? // ? process.env.NEXT_PUBLIC_UPLOADS_URL +
        images[0]
      : imgDefault;

  return (
    <Link
      href={`/Items/${id}`}
      className={favorite ? styles.favorite_product_item : styles.product_item}
    >
      <Image
        className={styles.normal}
        src={imageUrl}
        alt="상품이미지"
        width={282}
        height={426}
        priority
        unoptimized={true}
      />
      <p className={styles.name}>{name}</p>
      <p className={styles.price}>{`${numFormat}원`}</p>
      <div className={styles.favorite_container}>
        <Image
          className={styles.favorite_icon}
          src={icHeart}
          alt="좋아요이미지"
        ></Image>
        <p className={styles.favorite_count}>{favoriteCount}</p>
      </div>
    </Link>
  );
}

export default Product;
