import { useState } from "react";
import styles from "./PostComment.module.css";
import axios from "@/lib/axios";

export default function PostComment({ addComment, title, placehorder }) {
  // const articleId = detailArticle.article.id;
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 공백만 있는 경우 막아준다.
    if (!content.trim()) {
      return;
    }
    addComment(content);
    setContent("");
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputHeader}>{title}</div>
      <textarea
        className={styles.inputComment}
        placeholder={placehorder}
        value={content}
        onChange={handleChange}
      ></textarea>
      <button className={styles.postButton} disabled={!content.trim()}>
        등록
      </button>
    </form>
  );
}
