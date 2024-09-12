import { useState, useEffect } from "react";
import styles from "./BoardChat.module.css";
import ChatItem from "./ChatItem";
import { useComments } from "@/hooks/useComments";
import { throttle } from "@/utils/throttle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BoardChat({
  initialComments = [],
  articleId,
  totalComments,
  pageSize,
}) {
  const [formValid, setFormValid] = useState(false);
  const [comment, setComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);

  const {
    comments,
    loadMoreComments,
    hasMore,
    loading,
    addComment,
    editComment,
  } = useComments(articleId, initialComments, totalComments, pageSize);

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
        await editComment(editCommentId, comment);
      } else {
        await addComment(comment);
      }

      setComment("");
      setEditCommentId(null);
      setFormValid(false);
    } catch (error) {
      console.error("Error creating or updating comment:", error);
    }
  };

  useEffect(() => {
    let load = true;
    const handleScroll = throttle(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        loadMoreComments();
      } else if (!hasMore && load) {
        load = false;
        toast.info("모든 댓글을 불러왔습니다.");
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreComments, hasMore, loading]);

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={2000} />

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
      <ChatItem comments={comments} onEdit={handleEdit} />
    </div>
  );
}
