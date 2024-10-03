import Link from "next/link";
import styles from "./ProductList.module.scss";
import { ImageContainer } from "../ui/ImgContainers";
import { LikeNumber } from "../user/LikeButton";

function ProductCard({ product }) {
  if (product.length === 0) {
    return <p>product 없다</p>;
  }

  return (
    <div className={styles.ProductCard}>
      <ImageContainer
        src={product.images[0]}
        alt={product.name}
        radius="16px"
      />

      <div className={styles.text}>
        <h3>{product.name}</h3>
        <p>{product.price.toLocaleString()}원</p>
        <LikeNumber data={product} size={16} />
      </div>
    </div>
  );
}

export default function ProductList({ data, type = "all" }) {
  const { list } = data;
  if (list.length === 0) {
    return <p>빈 어레이임</p>;
  }
  const isBest = type === "best";
  return (
    <ul className={styles.ProductList}>
      {list.map((product) => {
        return (
          <li key={product.id} className={isBest ? styles.best : styles.all}>
            <Link href={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
