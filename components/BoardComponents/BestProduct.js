import styles from "./BestProduct.module.css";
import Image from "next/image";
import ProductImg from "../../images/product.png";

export default function BestProduct({ articles }) {
  const bestArticles = Array.isArray(articles.data) ? articles.data : [];

  return (
    <div className={styles.bestProducts}>
      <h3>베스트 게시글</h3>
      <div className={styles.product}>
        {bestArticles.length > 0 ? (
          bestArticles.map((article) => (
            <div className={styles.productItem} key={article.id}>
              <div className={styles.badge}>Best</div>
              <div className={styles.titleContainer}>
                <p className={styles.title}>{article.title}</p>
                <div className={styles.productImgContainer}>
                  <Image
                    src={ProductImg}
                    alt="product"
                    className={styles.productImg}
                  />
                </div>
              </div>
              <div className={styles.info}>
                <p className={styles.user}>총명한 판다 ♡ {article.favorite}</p>
                <p className={styles.date}>
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No best articles available.</p>
        )}
      </div>
    </div>
  );
}
