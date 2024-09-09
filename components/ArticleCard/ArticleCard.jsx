import styles from "./ArticleCard.module.scss";
import Image from "next/image";
import defaultImg from "../../public/assets/img_default.svg";
import inactiveHeart from "../../public/assets/icons/ic_heart_inactive.svg";
import activeHeart from "../../public/assets/icons/ic_heart_active.svg";
import bestBadge from "../../public/assets/img_badge.svg";

export default function ArticleCard({ article, userName }) {
  const articleImg = article.productImg ? article.productImg : defaultImg;
  const likeImg = userName ? inactiveHeart : activeHeart;
  return (
    <div className={styles.ArticleCard}>
      <div className={styles.top}>
        <Image src={bestBadge} alt="best badge" />
      </div>
      <div className={styles.middle}>
        <h4>{article.title}</h4>
        <Image src={articleImg} alt="article image" />
      </div>
      <div className={styles.bottom}>
        <span>{userName ? userName : "총명한 판다"}</span>
        <div>
          <Image scr={likeImg} alt="like icon" />
          <span>{article.favoriteCount}</span>
        </div>
        <span>{article.updatedAt}</span>
      </div>
    </div>
  );
}
