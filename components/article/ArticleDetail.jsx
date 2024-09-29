import { formatDate } from "@/utils/formatFn";
import ProfileImg from "@/components/ui/ProfileImg";
import KebabMenu from "@/components/ui/KebabMenu";
import styles from "./ArticleDetail.module.scss";
import LikeButton from "../user/LikeButton";

export default function ArticleDetail({ article, entity }) {
  const { writer } = article;
  return (
    <article className={styles.ArticleDetail}>
      <div className={styles.top}>
        <h3>{article.title}</h3>
        <KebabMenu idPath={article.id} entity={entity} />
      </div>
      <div className={styles.middle}>
        <div className={styles.user}>
          <ProfileImg width="40px" src={writer?.image} />
          <span className={styles.name}>
            {writer?.nickname || "총명한 판다"}
          </span>
          <span>{formatDate(article.createdAt)}</span>
        </div>

        <div className={styles["vertical-line"]}></div>

        <LikeButton data={article} />
      </div>
      <p className={styles.bottom}>{article.content}</p>
    </article>
  );
}
