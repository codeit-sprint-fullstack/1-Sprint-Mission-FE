import BestPost from "@components/BestPost";
import SearchBar from "@components/SearchBar";
import styles from "@styles/Community.module.css";

export default function Community() {
  return (
    <div className={styles.body}>
      <h1 className={`${styles.postTitle} text-xl bold`}>베스트 게시글</h1>
      <BestPost />
      <div className={styles.mainTitle}>
        <h1 className={`${styles.postTitle} text-xl bold`}>게시글</h1>
        <div className={`${styles.postButton} text-lg semibold`}>글쓰기</div>
      </div>
      <div className={styles.mainOption}>
        <SearchBar />
      </div>
    </div>
  );
}
