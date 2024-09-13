import Link from "next/link";
import styles from "./Article.module.css";
import ArticleList from "./ArticleList";

export default function Article({ articles }) {
  return (
    <div className={styles.article}>
      <div className={styles.container}>
        <div className={styles.title}>게시글</div>
        <Link href={"/post"}>
          <button className={styles.button}>글쓰기</button>
        </Link>
      </div>
      <div className={styles.searchContainer}>
        {/* 서치 컴포넌트 제작 후 여기 투입 */}
        {/* DropDown 컴포넌트 제작 후 여기 투입 */}
      </div>
      <div>
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
