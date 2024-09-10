import styles from "./BoardListItems.module.css";
import Image from "next/image";
import productImg from "@/images/product.png";
import profile from "@/images/ic_profile.png";
import Link from "next/link";

export default function BoardListItems({ articles }) {
  return (
    <>
      <div className={styles.boardListContainer}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <Link href={`/board/${article.id}`} passHref key={article.id}>
              <div className={styles.boardList}>
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
                    <p className={styles.user}>총명한 판다{article.id}</p>
                    <p className={styles.date}>
                      {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className={styles.like}>♡ {article.favorite}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No articles available.</p>
        )}
      </div>
    </>
  );
}
