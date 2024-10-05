import { useState, useEffect } from "react";
import styles from "./BoardChat.module.css";
import ChatItem from "./ChatItem.jsx";
import { useComments } from "@/hooks/useComments";
import { throttle } from "@/utils/throttle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BoardChat({ initialComments, articleId }) {
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
    nextCursor,
  } = useComments(articleId, initialComments);

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
    const handleScroll = throttle(() => {
      // 스크롤 위치와 hasMore, loading 상태 확인
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore && // 다음 댓글이 더 있는 경우에만
        !loading && // 로딩 중이 아닐 때만
        nextCursor // 다음 커서가 있는 경우에만
      ) {
        loadMoreComments(nextCursor);
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreComments, hasMore, loading, nextCursor]);

  useEffect(() => {
    if (!hasMore) {
      toast.info("모든 댓글을 불러왔습니다.");
    }
  }, [hasMore]);

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
