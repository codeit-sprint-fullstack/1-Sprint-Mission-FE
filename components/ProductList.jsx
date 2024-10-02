import Image from "next/image";
import icHeart from "../public/images/ic_heart.png";
import imgDefault from "../public/images/img_default.png";
import styles from "@/styles/products.module.css";
import Link from "next/link";

function Product({ itemValues, favorite }) {
  const { name, price, favoriteCount, id, images } = itemValues;
  const numFormat = price.toLocaleString();
  const productImage = images.length > 0 ? images[0] : imgDefault;
  return (
    <Link
      href={`/Items/${id}`}
      className={favorite ? styles.favorite_product_item : styles.product_item}
    >
      <Image
        className={styles.normal}
        src={productImage}
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

//코드 수정 확인후 삭제예정
// function ProductList({ items, favorite }) {
//   console.log(items);
//   return (
//     <div className={favorite ? styles.best_Products : styles.Products}>
//       {items.map((item) => (
//         <Product key={item.id} itemValues={item} favorite={favorite} />
//       ))}
//     </div>
//   );
// }

export default Product;
