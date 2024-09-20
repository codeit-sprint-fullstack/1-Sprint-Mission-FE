import Image from "next/image";
import Link from "next/link";
import { formatDate, formatLikes } from "@/utils/formatFn";
import ImageContainer from "../ui/ImgContainer";
import defaultImg from "../../public/assets/img_default.svg";
import inactiveHeart from "../../public/assets/icons/ic_heart_inactive.svg";
import activeHeart from "../../public/assets/icons/ic_heart_active.svg";
import bestBadge from "../../public/assets/icons/ic_medal.svg";
import styles from "./BestArticles.module.scss";
import { useBestArticles } from "@/service/queries";

function ArticleCard({ article, userName }) {
  const articleImg = article.productImg ? article.productImg : defaultImg;
  const likeImg = userName ? activeHeart : inactiveHeart;
  return (
    <>
      <div className={styles.top}>
        <Image src={bestBadge} alt="best badge icon" />
        <span>Best</span>
      </div>
      <div className={styles.middle}>
        <h3>{article.title}</h3>
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
            <span>{formatLikes(article.likeCount)}</span>
          </div>
        </div>

        <span className={styles.date}>{formatDate(article.updatedAt)}</span>
      </div>
    </>
  );
}

export default function BestArticles() {
  const { data } = useBestArticles({ pageSize: 3, orderBy: "like" });

  const { list } = data;

  if (list.length === 0) {
    return <p>빈 어레이임</p>;
  }

  return (
    <ul className={styles.BestArticles}>
      {list.map((article) => {
        return (
          <li className={styles.ArticleCard} key={article.id}>
            <Link href={`forum/${article.id}`}>
              <ArticleCard article={article} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
