import { useState, useEffect, useCallback } from "react";
import styles from "./ItemChat.module.css";
import Chat from "./Chat.jsx";
import { fetchComments, addComment, editComment } from "@/utils/productChatApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInfiniteScroll } from "@/hooks/useComments";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ItemChat({ initialComments, id }) {
  const [input, setInput] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [comments, setComments] = useState(initialComments?.list || []);
  const [cursor, setCursor] = useState(initialComments.nextCursor || null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const queryClient = useQueryClient();
  console.log(cursor);
  useEffect(() => {
    setFormValid(input.trim().length > 0);
  }, [input]);
  const addCommentMutation = useMutation({
    mutationFn: (newComment) => addComment(id, newComment),
    onSuccess: (addedComment) => {
      setComments((prevComments) => [addedComment, ...prevComments]);
      setInput("");
      queryClient.invalidateQueries(["comments", id]);
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: (updatedComment) => editComment(currentEditId, updatedComment),
    onSuccess: (editedComment) => {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === currentEditId ? editedComment : comment
        )
      );
      setIsEditing(false);
      setCurrentEditId(null);
      setInput("");
      queryClient.invalidateQueries(["comments", id]);
    },
    onError: (error) => {
      console.error("Error editing comment:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValid) return;

    const newComment = { content: input };

    if (isEditing) {
      editCommentMutation.mutate(newComment);
    } else {
      addCommentMutation.mutate(newComment);
    }
  };

  const loadMoreComments = useCallback(async () => {
    if (!hasMore || cursor === null) return;

    setLoading(true);
    try {
      const newCommentsData = await fetchComments(id, cursor);

      if (newCommentsData) {
        const newComments = newCommentsData.list || [];

        if (newComments.length > 0) {
          setComments((prevComments) => [...prevComments, ...newComments]);
          setCursor(newCommentsData.nextCursor);
          setHasMore(newCommentsData.nextCursor !== null);
        } else {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more comments:", error);
      setHasMore(false);
      toast.info("모든 댓글을 불러왔습니다.");
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
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
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
