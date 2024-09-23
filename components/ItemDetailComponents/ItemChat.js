import { useState, useEffect } from "react";
import styles from "./ItemChat.module.css";
import Chat from "./Chat";
import { editComment, addComment } from "@/utils/productChatApi";

export default function ItemChat({ initialComments, id }) {
  const [input, setInput] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [comments, setComments] = useState(initialComments?.list || []); // Ensure the array defaults

  useEffect(() => {
    setFormValid(input.trim().length > 0);
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return;

    const newComment = { content: input };

    if (isEditing) {
      try {
        const updatedComment = await editComment(currentEditId, newComment);
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === currentEditId ? updatedComment : comment
          )
        );
        setIsEditing(false);
        setCurrentEditId(null);
      } catch (error) {
        console.error("Error editing comment:", error);
      }
    } else {
      try {
        const addedComment = await addComment(id, newComment);
        setComments((prevComments) => [addedComment, ...prevComments]);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }

    setInput("");
  };

  const handleEdit = (comment) => {
    setInput(comment.content);
    setIsEditing(true);
    setCurrentEditId(comment.id);
  };

  return (
    <>
      <div className={styles.addChatContainer}>
        <p className={styles.addText}>문의하기</p>
        <textarea
          className={styles.inputChat}
          placeholder="댓글을 입력하세요."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className={styles.addBtn}
          disabled={!formValid}
          onClick={handleSubmit}
        >
          {isEditing ? "수정" : "등록"}
        </button>
      </div>
      <Chat comments={comments} onEdit={handleEdit} setComments={setComments} />
    </>
  );
}
