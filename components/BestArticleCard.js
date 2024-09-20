import Image from "next/image";
import styles from "./BestArticleCard.module.css";
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
    <Link href={`/articles/${article.id}`} className={styles.bestArticleCard}>
      <Image src="/img_badge.png" width={102} height={30} alt="Article Card" />
      <br />
      <p className={styles.bestArticleTitle}>{article.title}</p>
      <Image
        src="/default_img.png"
        className={styles.bestArticleDefaultImg}
        width={72}
        height={72}
        alt="Default Image"
      />
      <div className={styles.bestArticleCardEtc}>
        <span>총명한 판다</span>
        <Image
          src="/ic_heart.png"
          className={styles.bestArticleCardHeart}
          width={16}
          height={16}
          alt="Favorite Count"
        />
        <span style={{ color: "#6b7280" }}>9999+</span>
      </div>
      <p className={styles.bestArticleDate}>{formatDate(article.createdAt)}</p>
    </Link>
  );
}
