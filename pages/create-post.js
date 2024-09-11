import styles from "@styles/CreatePost.module.css";
import { useState } from "react";

export default function CreatePost({ createMode = "게시글 쓰기" }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("제목:", title);
    console.log("내용:", content);
  };

  const isFormValid = title !== "" && content !== "";

  return (
    <form className={styles.body} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <span className="text-xl bold">{createMode}</span>
        <button
          type="submit"
          className={`${styles.postButton} ${
            isFormValid ? styles.active : ""
          } text-lg semibold`}
          disabled={!isFormValid}
        >
          등록
        </button>
      </div>
      <div className={`${styles.formGroup} text-2lg bold`}>
        <label htmlFor="title">*제목</label>
        <input
          type="text"
          id="title"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={`${styles.formGroup} text-2lg bold`}>
        <label htmlFor="content">*내용</label>
        <textarea
          id="content"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
        />
      </div>
    </form>
  );
}
