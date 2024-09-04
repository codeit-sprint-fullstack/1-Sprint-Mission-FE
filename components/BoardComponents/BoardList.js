import styles from "./BoardList.module.css";

export default function BoardList() {
  return (
    <>
      <div className={styles.createContainer}>
        <h3>게시글</h3>
        <button className={styles.createBtn}>글쓰기</button>
      </div>
    </>
  );
}
