import Image from "next/image";
import styles from "@/styles/ArticleCard.module.css";
import Link from "next/link";

export default function articleCard({ article }) {
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", options)
      .replace(/\./g, "")
      .replace(/ /g, ". ");
  }

  return (
    <Link href={`/articles/${article.id}`} className={styles.article_card}>
      <p className={styles.article_card_title}>{article.title}</p>
      <Image
        src="/default_img.png"
        className={styles.article_card_default_img}
        width={72}
        height={72}
        alt="default_img"
      />
      <div className={styles.article_card_etc}>
        <div className={styles.article_card_etc_information}>
          <Image
            src="/ic_profile.png"
            className={styles.article_card_user_img}
            width={24}
            height={24}
            alt="user_profile"
          />
          <span className={styles.article_card_nickname}>총명한 판다</span>
          <p className={styles.article_card_date}>
            {formatDate(article.createdAt)}
          </p>
        </div>
        <div className={styles.article_card_favorite_count_container}>
          <Image
            src="/ic_heart.png"
            className={styles.article_card_heart_img}
            width={16}
            height={16}
            alt="favorite_count"
          />
          <p className={styles.article_card_favorite_count}>9999+</p>
        </div>
      </div>
    </Link>
  );
}
