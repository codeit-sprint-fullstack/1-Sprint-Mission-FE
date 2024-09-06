import { useState } from "react";
import styles from "./BoardChat.module.css";
import ChatItem from "./ChatItem";
import { createComments } from "@/utils/chatApi";

export default function BoardChat({ comments }) {
  const [formValid, setFormValid] = useState(false);
  const [comment, setComment] = useState("");
  const [chats, setChats] = useState(comments);

  const validateAndSetFormValid = (value) => {
    setFormValid(value.trim().length > 0);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setComment(value);
    validateAndSetFormValid(value);
  };

  const handleSubmit = async () => {
    if (!formValid) return;
    try {
      const newComment = await createComments(comments[0].articleId, {
        content: comment,
      });
      if (newComment) {
        setChats((prevChats) => [newComment, ...prevChats]);
      }
      setComment("");
      setFormValid(false);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <p className={styles.chatTitle}>댓글달기</p>
        <textarea
          className={styles.inputChat}
          value={comment}
          placeholder="댓글을 입력해주세요."
          onChange={handleChange}
        ></textarea>
        <button
          className={styles.sendBtn}
          disabled={!formValid}
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
      <ChatItem comments={chats} />
    </div>
  );
}
