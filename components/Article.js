import Link from "next/link";
import Image from "next/image";
import styles from "./Article.module.css";

export default function ArticleCard({ article }) {
  // 날짜를 원하는 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, "")
      .replace(/ /g, ". ");
    return formattedDate;
  };

  return (
    <Link href={`/articles/${article.id}`} className={styles.card}>
      <p className={styles.title}>{article.title}</p>
      <Image
        src="/default_img.png"
        alt="기본 이미지"
        width={72}
        height={72}
        className={styles.defaultImage}
      />
      <div className={styles.infoContainer}>
        <div className={styles.userInfo}>
          <Image
            src="/ic_profile.png"
            alt="유저 프로필"
            width={24}
            height={24}
            className={styles.profileImage}
          />
          <span className={styles.nickname}>총명한 판다</span>
          <p className={styles.date}>{formatDate(article.createdAt)}</p>
        </div>
        <div className={styles.likesContainer}>
          <Image
            src="/ic_heart.png"
            alt="좋아요 수"
            width={16}
            height={16}
            className={styles.heartIcon}
          />
          <p className={styles.likesCount}>9999+</p>
        </div>
      </div>
    </Link>
  );
}
