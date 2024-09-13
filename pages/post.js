import styles from "@/styles/Post.module.css";

export default function Post() {
  return (
    <div className={styles.post}>
      <div className={styles.titleContainer}>
        <div className={styles.postHeader}>게시글 쓰기</div>
        <button className={styles.postButton}>등록</button>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <div className={styles.inputHeader}>*제목</div>
          <input className={styles.inputTitle} placeholder="제목을 입력해주세요"></input>
        </div>
        <div className={styles.input}>
          <div className={styles.inputHeader}>*내용</div>
          <textarea className={styles.inputContent} placeholder="내용을 입력해주세요"></textarea>
        </div>
      </div>
    </div>
  );
}
