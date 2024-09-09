import { useState } from "react";
import styles from "./BoardChat.module.css";
import ChatItem from "./ChatItem";
import { createComments, updateComments } from "@/utils/chatApi";

export default function BoardChat({ articleId, comments }) {
  const [formValid, setFormValid] = useState(false);
  const [comment, setComment] = useState("");
  const [chats, setChats] = useState(comments);
  const [editCommentId, setEditCommentId] = useState(null);

  const validateAndSetFormValid = (value) => {
    setFormValid(value.trim().length > 0);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setComment(value);
    validateAndSetFormValid(value);
  };

  const handleEdit = (chatItem) => {
    setComment(chatItem.content);
    setEditCommentId(chatItem.id);
  };

  const handleSubmit = async () => {
    if (!formValid) return;

    try {
      if (editCommentId) {
        const updatedComment = await updateComments(editCommentId, {
          content: comment,
        });
        if (updatedComment) {
          setChats((prevChats) =>
            prevChats.map((c) => (c.id === editCommentId ? updatedComment : c))
          );
        }
      } else {
        const newComment = await createComments(articleId, {
          content: comment,
        });
        if (newComment) {
          setChats((prevChats) => [newComment, ...prevChats]);
        }
      }

      setComment("");
      setEditCommentId(null);
      setFormValid(false);
    } catch (error) {
      console.error("Error creating or updating comment:", error);
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
          {editCommentId ? "수정" : "등록"}
        </button>
      </div>
      <ChatItem comments={chats} onEdit={handleEdit} />
    </div>
  );
}
