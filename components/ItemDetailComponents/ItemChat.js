import { useState, useEffect } from "react";
import styles from "./ItemChat.module.css";
import Chat from "./Chat";
import { editComment, addComment } from "@/utils/productChatApi";

export default function ItemChat({ comments, id }) {
  const [input, setInput] = useState(""); // textarea의 입력값을 관리
  const [formValid, setFormValid] = useState(false); // 폼 유효성 상태
  const [isEditing, setIsEditing] = useState(false); // 수정 상태 여부
  const [currentEditId, setCurrentEditId] = useState(null); // 수정 중인 댓글 ID

  // textarea 값이 변경될 때 폼 유효성 검사
  useEffect(() => {
    setFormValid(input.trim().length > 0); // 공백을 제외한 입력이 있을 때만 활성화
  }, [input]);

  // 댓글 등록 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValid) return; // 입력이 유효하지 않으면 실행하지 않음

    const newComment = {
      content: input,
    };

    // 수정 모드일 경우 수정 처리
    if (isEditing) {
      editComment(currentEditId, newComment)
        .then(() => {
          // 수정 완료 후 초기화
          setInput("");
          setIsEditing(false);
          setCurrentEditId(null);
        })
        .catch((error) => {
          console.error("Error editing comment:", error);
        });
    } else {
      // 등록 모드일 경우 등록 처리
      addComment(id, newComment)
        .then(() => {
          setInput("");
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        });
    }
  };

  // 수정 모드로 전환하는 함수
  const handleEdit = (comment) => {
    setInput(comment.content); // 현재 댓글 내용을 textarea에 설정
    setIsEditing(true); // 수정 상태로 전환
    setCurrentEditId(comment.id);
  };

  return (
    <>
      <div className={styles.addChatContainer}>
        <p className={styles.addText}>문의하기</p>
        <textarea
          className={styles.inputChat}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          value={input}
          onChange={(e) => setInput(e.target.value)} // 입력값 관리
        />
        <button
          className={styles.addBtn}
          disabled={!formValid} // 폼이 유효하지 않으면 비활성화
          onClick={handleSubmit}
        >
          {isEditing ? "수정" : "등록"} {/* 수정 모드일 경우 '수정'으로 변경 */}
        </button>
      </div>
      <Chat comments={comments} onEdit={handleEdit} /> {/* 수정 이벤트 전달 */}
    </>
  );
}
