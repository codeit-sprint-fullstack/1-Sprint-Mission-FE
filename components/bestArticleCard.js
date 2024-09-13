import Image from "next/image";
import styles from "@/styles/BestArticle.module.css";
import Link from "next/link";

export default function BestArticleCard({ article }) {
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", options)
      .replace(/\./g, "")
      .replace(/ /g, ". ");
  }

  return (
    <Link href={`/articles/${article.id}`} className={styles.best_article_card}>
      <Image src="/img_badge.png" width={102} height={30} alt="article_card" />
      <br />
      <p className={styles.best_article_title}>{article.title}</p>
      <Image
        src="/default_img.png"
        className={styles.best_article_default_img}
        width={72}
        height={72}
        alt="default_img"
      />
      <div className={styles.best_article_card_etc}>
        <span>총명한 판다</span>
        <Image
          src="/ic_heart.png"
          className={styles.best_article_card_etc_heart}
          width={16}
          height={16}
          alt="favorite_count"
        />
        <span style={{ color: "#6b7280" }}>9999+</span>
      </div>
      <p className={styles.best_article_date}>
        {formatDate(article.createdAt)}
      </p>
    </Link>
  );
}
