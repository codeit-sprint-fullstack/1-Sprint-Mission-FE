import Image from "next/image";
import icHeart from "../public/images/ic_heart.png";
import imgDefault from "../public/images/img_default.png";
import styles from "@/styles/products.module.css";
import Link from "next/link";

function Product({ itemValues, favorite }) {
  const { name, price, favoriteCount, id } = itemValues;
  const numFormat = price.toLocaleString();
  return (
    <Link
      href={`/Items/${id}`}
      className={favorite ? styles.favorite_product_item : styles.product_item}
    >
      <Image
        className={styles.normal}
        src={imgDefault}
        alt="상품이미지"
        priority={true}
      ></Image>
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

function ProductList({ items, favorite }) {
  return (
    <div className={favorite ? styles.best_Products : styles.Products}>
      {items.map((item) => (
        <Product key={item.id} itemValues={item} favorite={favorite} />
      ))}
    </div>
  );
}

export default ProductList;
