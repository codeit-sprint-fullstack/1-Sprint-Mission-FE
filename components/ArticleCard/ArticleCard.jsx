import styles from "./ArticleCard.module.scss";
import Image from "next/image";
import defaultImg from "../../public/assets/img_default.svg";
import inactiveHeart from "../../public/assets/icons/ic_heart_inactive.svg";
import activeHeart from "../../public/assets/icons/ic_heart_active.svg";
import bestBadge from "../../public/assets/icons/ic_medal.svg";
import { formatDate, likeFormat } from "@/lib/utils";

export default function ArticleCard({ article, userName }) {
  const articleImg = article.productImg ? article.productImg : defaultImg;
  const likeImg = userName ? activeHeart : inactiveHeart;
  return (
    <div className={styles.ArticleCard}>
      <div className={styles.top}>
        <Image src={bestBadge} alt="best badge" />
        <span>Best</span>
      </div>
      <div className={styles.middle}>
        <h4>{article.title}</h4>
        <div className={styles["img-container"]}>
          <Image src={articleImg} fill alt="article image" />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles["bottom-left"]}>
          <span>{userName ? userName : "총명한 판다"}</span>
          <div className={styles.like}>
            <button>
              <Image src={likeImg} alt="like icon" />
            </button>
            <span>{likeFormat(article.favoriteCount)}</span>
          </div>
        </div>

        <span className={styles.date}>{formatDate(article.updatedAt)}</span>
      </div>
    </div>
  );
}
