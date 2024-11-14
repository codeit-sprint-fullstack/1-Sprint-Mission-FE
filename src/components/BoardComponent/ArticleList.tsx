import Image from "next/image";
import Link from "next/link";
import styles from "./ArticleList.module.css";
import defaultProductImg from "@/images/defaultProductImg.png";
import defaultUserImg from "@/images/defaultUserImg.png";
import { ArticleProps } from "@/types/Types";

export default function ArticleList({ articles }: ArticleProps) {
  return (
    <>
      <ul className={styles.articleListContainer}>
        {articles.slice(0, 4).map((article) => (
          <li key={article.id}>
            <Link href={`/board/${article.id}`}>
              <div className={styles.articleList}>
                <div className={styles.articleListHeader}>
                  <span className={styles.title}>{article.title}</span>
                  <Image
                    src={defaultProductImg}
                    alt="product"
                    width={72}
                    height={72}
                  />
                </div>
                <div className={styles.articleInfoContainer}>
                  <div className={styles.articleInfo}>
                    <Image src={defaultUserImg} alt="user" />
                    <span className={styles.user}>총명한판다</span>
                    <span className={styles.date}>{article.createdAt}</span>
                  </div>
                  <span className={styles.favorite}>🤍 9999+</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {/* loading컴포넌트 */}
      <div>loading</div>
    </>
  );
}
