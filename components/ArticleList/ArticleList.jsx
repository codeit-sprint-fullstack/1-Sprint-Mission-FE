import styles from "./ArticleList.module.scss";
import Image from "next/image";
import defaultProfile from "../../public/assets/icons/ic_profile.svg";
import defaultArticleImg from "../../public/assets/img_default.svg";

import { formatDate } from "@/lib/utils";
import ImageContainer from "../ImgContainer/ImgContainer";

export default function ArticleList({ data }) {
  const { list, nextCursor } = data;

  if (list.length === 0) {
    return <p>빈 어레이임</p>;
  }
  return (
    <ul className={styles.ArticleList}>
      {list.map((article) => {
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

                <span>총명한 판다</span>
                <span>{formatDate(article.updatedAt)}</span>
              </div>
              <div className={styles["bottom-right"]}></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
