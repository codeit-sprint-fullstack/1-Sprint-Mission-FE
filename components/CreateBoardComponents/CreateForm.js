import styles from "./CreateForm.module.css";

export default function CreateForm() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>게시글 쓰기</h2>
          <button className={styles.addBtn}>등록</button>
        </div>
        <form className={styles.createForm}>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel}>*제목</label>
            <input
              className={styles.formInput}
              placeholder="제목을 입력해주세요"
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel}>*내용</label>
            <textarea
              className={styles.formInput}
              placeholder="내용을 입력해주세요"
            />
          </div>
        </form>
      </div>
    </>
  );
}
