import styles from "./ArticleList.module.scss";
import Image from "next/image";
import defaultProfile from "../../public/assets/icons/ic_profile.svg";
import defaultArticleImg from "../../public/assets/img_default.svg";
import inactiveHeart from "../../public/assets/icons/ic_heart_inactive.svg";
import ImageContainer from "../ui/ImgContainer";
import { formatDate, likeFormat } from "@/lib/utils";

export default function ArticleList({ data }) {
  return (
    <ul className={styles.ArticleList}>
      {data.map((page) => {
        const { list } = page;
        return list.map((article) => {
          return (
            <li key={article.id}>
              <div className={styles.top}>
                <h4>{article.title}</h4>

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
                  <ImageContainer
                    src={defaultProfile}
                    width="24px"
                    height="24px"
                    radius="50%"
                  />

                  <span className={styles["user-name"]}>총명한 판다</span>
                  <span className={styles["date"]}>
                    {formatDate(article.updatedAt)}
                  </span>
                </div>
                <div className={styles["bottom-right"]}>
                  <Image
                    src={inactiveHeart}
                    alt="like icon"
                    width={24}
                    height={24}
                  />
                  <span>{likeFormat(article.favoriteCount)}</span>
                </div>
              </div>
            </li>
          );
        });
      })}
    </ul>
  );
}
