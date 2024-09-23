import { useState, useEffect, useCallback } from "react";
import styles from "./ItemChat.module.css";
import Chat from "./Chat";
import {
  editComment,
  addComment,
  fetchMoreComments,
} from "@/utils/productChatApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInfiniteScroll } from "@/hooks/useComments";

export default function ItemChat({ initialComments, id }) {
  const [input, setInput] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [comments, setComments] = useState(initialComments?.list || []);
  const [cursor, setCursor] = useState(initialComments?.nextCursor || null); // 커서값을 초기값으로 설정
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 확인하는 상태

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
      } catch (error) {}
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

  const loadMoreComments = useCallback(async () => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const newCommentsData = await fetchMoreComments(id, cursor);
      const newComments = newCommentsData?.list || [];

      if (newComments.length > 0) {
        setComments((prevComments) => [...prevComments, ...newComments]);
        setCursor(newCommentsData.nextCursor);
      } else {
        setHasMore(false);
        toast.info("모든 댓글을 불러왔습니다.");
      }
    } catch (error) {
      setHasMore(false);
    }
    setLoading(false);
  }, [id, cursor, hasMore]);

  useInfiniteScroll({
    loadMore: loadMoreComments,
    hasMore,
    isLoading: loading,
  });
  const handleEdit = (comment) => {
    setInput(comment.content);
    setIsEditing(true);
    setCurrentEditId(comment.id);
  };

  return (
    <>
      <div className={styles.addChatContainer}>
        <ToastContainer position="top-right" autoClose={2000} />
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
