import styles from "./ArticleCard.module.scss";
import Image from "next/image";
import defaultImg from "../../public/assets/img_default.svg";
import inactiveHeart from "../../public/assets/icons/ic_heart_inactive.svg";
import activeHeart from "../../public/assets/icons/ic_heart_active.svg";
import bestBadge from "../../public/assets/icons/ic_medal.svg";
import { formatDate, likeFormat } from "@/lib/utils";
import ImageContainer from "../ImgContainer/ImgContainer";

export default function ArticleCard({ article, userName }) {
  const articleImg = article.productImg ? article.productImg : defaultImg;
  const likeImg = userName ? activeHeart : inactiveHeart;
  return (
    <li className={styles.ArticleCard}>
      <div className={styles.top}>
        <Image src={bestBadge} alt="best badge" />
        <span>Best</span>
      </div>
      <div className={styles.middle}>
        <h4>{article.title}</h4>
        <ImageContainer
          src={articleImg}
          width="72px"
          height="72px"
          radius="6px"
          borderColor="g.$grey-200"
        />
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
    </li>
  );
}
