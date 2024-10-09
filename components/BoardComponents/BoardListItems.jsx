import styles from "./BoardListItems.module.css";
import Image from "next/image";
import productImg from "@/images/product.png";
import profile from "@/images/ic_profile.png";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";

export default function BoardListItems({ articles }) {
  const imgUrl = "https://thrift-shop.onrender.com";
  return (
    <>
      <div className={styles.boardListContainer}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <Link href={ROUTES.ARTICLE(article.id)} passHref key={article.id}>
              <div className={styles.boardList}>
                <div className={styles.titleContainer}>
                  <p className={styles.title}>{article.title}</p>
                  <div className={styles.productImgContainer}>
                    <Image
                      src={
                        article.images.length > 0
                          ? imgUrl + article.images[0]
                          : productImg
                      }
                      alt="product"
                      className={styles.productImg}
                      width={48}
                      height={48}
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
                    <p className={styles.user}>{article.writer.nickname}</p>
                    <p className={styles.date}>
                      {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className={styles.like}>♡ {article.likeCount}</p>
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
