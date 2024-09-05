import styles from "./BoardListItems.module.css";
import Image from "next/image";
import productImg from "@/images/product.png";
import profile from "@/images/ic_profile.png";

export default function BoardListItems({ articles }) {
  const articlesList = Array.isArray(articles.data) ? articles.data : [];
  return (
    <>
      <div className={styles.boardListContainer}>
        {articlesList.length > 0 ? (
          articlesList.map((article) => (
            <div className={styles.boardList} key={article.id}>
              <div className={styles.titleContainer}>
                <p className={styles.title}>{article.title}</p>
                <div className={styles.productImgContainer}>
                  <Image
                    src={productImg}
                    alt="product"
                    className={styles.productImg}
                  />
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.infoContainer}>
                  <Image
                    src={profile}
                    alt="profile"
                    className={styles.profileImg}
                  />
                  <p className={styles.user}>총명한 판다</p>
                  <p className={styles.date}>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className={styles.like}>♡ {article.favorite}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No best articles available.</p>
        )}
      </div>
    </>
  );
}
