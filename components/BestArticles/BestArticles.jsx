import styles from "./BestArticles.module.scss";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
export default function BestArticles({ list }) {
  if (list.length === 0) {
    return <p>빈 어레이임</p>;
  }

  return (
    <ul className={styles.BestArticles}>
      {list.map((article) => {
        return (
          <li key={article.id}>
            <ArticleCard article={article} />
          </li>
        );
      })}
    </ul>
  );
}
