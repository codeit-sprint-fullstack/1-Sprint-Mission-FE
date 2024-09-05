import styles from "./BestProduct.module.css";
import Image from "next/image";
import ProductImg from "@/images/product.png";
export default function BestProduct() {
  return (
    <>
      <div className={styles.bestProducts}>
        <h3>베스트 게시글</h3>
        <div className={styles.product}>
          <div className={styles.productItem}>
            <div className={styles.badge}>Best</div>
            <div className={styles.titleContainer}>
              <p className={styles.title}>
                맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
              </p>
              <div className={styles.productImgContainer}>
                <Image
                  src={ProductImg}
                  alt="product"
                  className={styles.productImg}
                />
              </div>
            </div>
            <div className={styles.info}>
              <p className={styles.user}>총명한 판다 ♡ 9999+</p>
              <p className={styles.date}>2024. 04. 16</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
