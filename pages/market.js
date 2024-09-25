import styles from "../styles/market.module.css";
import { getProducts } from "./api/products";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Modal } from "../components/modal";
export default function Market() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
        console.log(response);
      } catch (error) {
        console.error("상품을 못 찾음", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <div className={styles.marketContainer}>
        <div className={styles.marketContent}>
          <div className={styles.marketTitle}>
            <p>Market</p>
          </div>
          <div className={styles.marketList}>
            {products.map((product) => (
              <div
                onClick={() => router.push(`/items/${product.id}`)}
                className={styles.marketItem}
                key={product.id}
              >
                <div className={styles.marketImg}>
                  <Image
                    src={product.images[0]}
                    alt="product"
                    width={200}
                    height={200}
                  />
                </div>
                <div className={styles.marketInfo}>
                  <p>{product.title}</p>
                  <p>{product.price} 원</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
