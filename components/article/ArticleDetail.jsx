import Image from "next/image";
import { formatDate, formatLikes } from "@/lib/utils";
import { deleteArticleById } from "@/lib/api";
import ProfileImg from "@/components/ui/ProfileImg";
import KebabMenu from "@/components/ui/KebabMenu";
import inactiveHeart from "../../public/assets/icons/ic_heart_inactive.svg";
import styles from "./ArticleDetail.module.scss";

export default function ArticleDetail({ article }) {
  return (
    <article className={styles.ArticleDetail}>
      <div className={styles.top}>
        <h3>{article.title}</h3>
        <KebabMenu
          idPath={article.id}
          deleteApi={deleteArticleById}
          entity="article"
        />
      </div>
      <div className={styles.middle}>
        <div className={styles.user}>
          <ProfileImg width="40px" src={article.image} />
          <span className={styles.name}>
            {article.writer?.nickname || "총명한 판다"}
          </span>
          <span>{formatDate(article.createdAt)}</span>
        </div>

        <div className={styles["vertical-line"]}></div>

        <button className={styles.likes}>
          <Image src={inactiveHeart} alt="heart icon" width={32} height={32} />
          <span>{formatLikes(article.likeCount)}</span>
        </button>
      </div>
      <p className={styles.bottom}>{article.content}</p>
    </article>
  );
}
