import styles from "./BestProduct.module.css";
export default function BestProduct() {
  return (
    <>
      <div className={styles.bestProducts}>
        <h3>베스트 게시글</h3>
        <div className={styles.product}></div>
      </div>
    </>
  );
}
