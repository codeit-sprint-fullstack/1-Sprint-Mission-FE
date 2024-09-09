import BestPost from "@components/BestPost";
import styles from "@styles/Community.module.css";

export default function Community() {
  return (
    <div className={styles.body}>
      <h1 className={`${styles.postTitle} text-xl bold`}>베스트 게시글</h1>
      <BestPost />
      <h1 className={`${styles.postTitle} text-xl bold`}>게시글</h1>
    </div>
  );
}
