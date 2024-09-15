import Image from "next/image";
import { formatDate, formatLikes } from "@/lib/utils";
import defaultArticleImg from "../../public/assets/img_default.svg";
import inactiveHeart from "../../public/assets/icons/ic_heart_inactive.svg";
import ImageContainer from "../ui/ImgContainer";
import Link from "next/link";
import ProfileImg from "../ui/ProfileImg";
import styles from "./ArticleList.module.scss";

function ArticleContent({ article }) {
  return (
    <>
      <div className={styles.top}>
        <h3>{article.title}</h3>

        <ImageContainer
          src={defaultArticleImg}
          width="72px"
          height="72px"
          radius="6px"
          borderColor="g.$grey-200"
        />
      </div>
      <div className={styles.bottom}>
        <div className={styles["bottom-left"]}>
          <ProfileImg />
          <span className={styles["user-name"]}>총명한 판다</span>
          <span className={styles["date"]}>
            {formatDate(article.updatedAt)}
          </span>
        </div>
        <div className={styles["bottom-right"]}>
          <Image src={inactiveHeart} alt="like icon" width={24} height={24} />
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
