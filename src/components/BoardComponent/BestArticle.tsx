import Link from "next/link";
import Image from "next/image";
import styles from "./BestArticle.module.css";
import defaultProductImg from "@/images/defaultProductImg.png";
import medal from "@/images/ic_medal.png";
import { ArticleProps } from "@/types/Types";

export default function BestArticle({ articles }: ArticleProps) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>베스트 게시글</div>
      <ul className={styles.bestArticleContainer}>
        {articles.slice(0, 3).map((article) => (
          <li key={article.id}>
            <Link href={`/board/${article.id}`}>
              <div className={styles.background}>
                <div className={styles.bestArticle}>
                  <div className={styles.bestContainer}>
                    <Image src={medal} alt="medal" />
                    <div className={styles.best}>Best</div>
                  </div>
                  <div className={styles.bestArticleHeader}>
                    <div className={styles.articleTitle}>{article.title}</div>
                    <Image
                      src={defaultProductImg}
                      alt="product"
                      width={72}
                      height={72}
                    />
                  </div>
                  <div className={styles.bestArticleInfoContainer}>
                    <div className={styles.bestArticleInfo}>
                      <span className={styles.user}>총명한판다</span>
                      <span className={styles.favorite}>🤍 9999+</span>
                    </div>
                    <span className={styles.date}>{article.createdAt}</span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
