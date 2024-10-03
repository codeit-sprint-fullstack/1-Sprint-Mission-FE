import { formatDate, formatLikes } from "@/utils/formatFn";
import assets from "@/variables/images";
import Link from "next/link";
import ProfileImg from "../ui/ProfileImg";
import styles from "./ArticleList.module.scss";
import { IconContainer, ImageContainer } from "../ui/ImgContainers";

function ArticleContent({ article }) {
  const { writer } = article;

  return (
    <>
      <div className={styles.top}>
        <h3>{article.title}</h3>

        <ImageContainer
          src={article?.image}
          width="72px"
          radius="6px"
          isBorder={true}
        />
      </div>
      <div className={styles.bottom}>
        <div className={styles["bottom-left"]}>
          <ProfileImg src={writer.image} />
          <span className={styles["user-name"]}>총명한 판다</span>
          <span className={styles["date"]}>
            {formatDate(article.updatedAt)}
          </span>
        </div>
        <div className={styles["bottom-right"]}>
          <IconContainer src={assets.icons.heartInactive} alt="like icon" />
          <span>{formatLikes(article.likeCount)}</span>
        </div>
      </div>
    </>
  );
}

export default function ArticleList({ data }) {
  return (
    <ul className={styles.ArticleList}>
      {data.map((page) => {
        return page.list.map((article) => {
          return (
            <li key={article.id}>
              <Link href={`/forum/${article.id}`}>
                <ArticleContent article={article} />
              </Link>
            </li>
          );
        });
      })}
    </ul>
  );
}
