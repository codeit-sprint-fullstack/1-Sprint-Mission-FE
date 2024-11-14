import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./PostComment.module.css";
import axios from "@/lib/axios";
import { PostCommentProps } from "@/types/Types";

export default function PostComment({
  addComment,
  title,
  placeholder,
}: PostCommentProps) {
  const [content, setContent] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
        placeholder={placeholder}
        value={content}
        onChange={handleChange}
      />
      <button
        className={styles.postButton}
        disabled={!content.trim()}
        type="submit"
      >
        등록
      </button>
    </form>
  );
}
