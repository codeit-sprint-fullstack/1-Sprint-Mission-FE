import Link from "next/link";
import { formatDate, formatLikes } from "@/utils/formatFn";
import { IconContainer, ImageContainer } from "../ui/ImgContainers";
import styles from "./BestArticles.module.scss";
import { useGetBestList } from "@/service/queries";
import assets from "@/variables/images";
import Loader from "../ui/Loader";

function ArticleCard({ article, userName }) {
  return (
    <>
      <div className={styles.top}>
        <IconContainer
          src={assets.icons.medal}
          width="16px"
          alt="best badge icon"
        />
        <span>Best</span>
      </div>
      <div className={styles.middle}>
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
          <span>{userName ? userName : "총명한 판다"}</span>
          <div className={styles.like}>
            <button>
              <IconContainer src={assets.icons.heart} alt="like icon" />
            </button>
            <span>{formatLikes(article.likeCount)}</span>
          </div>
        </div>

        <span className={styles.date}>{formatDate(article.updatedAt)}</span>
      </div>
    </>
  );
}

export default function BestArticles({ entity }) {
  const { data, isPending, isLoading } = useGetBestList(entity, {
    pageSize: 3,
    orderBy: "like",
  });

  if (isPending || isLoading) {
    return <Loader />;
  }

  const { list } = data;

  if (list.length === 0) {
    return <p> 해당된 검색 결과가 없습니다</p>;
  }

  return (
    <ul className={styles.BestArticles}>
      {list.map((article) => {
        return (
          <li className={styles.ArticleCard} key={article.id}>
            <Link href={`/forum/${article.id}`}>
              <ArticleCard article={article} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
