import styles from "./commentModal.module.css";
import Image from "next/image";
import { useState } from "react";
import { patchcomment } from "../../pages/api/api"; // 수정 함수 불러오기
import { useRouter } from "next/router";

const CommentModal = ({ isOpen, closeModal, id, commentsId }) => {
  // commentsId prop 추가
  const [btnState, setbtnState] = useState("commentBtnfalse");
  const [content, setcontent] = useState("");
  const router = useRouter();

  if (!isOpen) {
    return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
  }

  const contentHandle = (e) => {
    setcontent(e.target.value);
    if (e.target.value.length > 0) {
      // content 대신 e.target.value 사용
      setbtnState("addbtn");
    } else {
      setbtnState("addbtnfalse");
    }
  };

  const patchClick = async (e) => {
    e.preventDefault();
    const data = { content };

    try {
      await patchcomment(id, commentsId, data); // 댓글 수정 API 호출
      closeModal();
      router.reload(); // 페이지 새로고침
    } catch (e) {
      console.log("댓글 수정 실패:", e);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.sss}>
          <Image
            onClick={closeModal}
            src="/deleteImg.svg"
            width={24}
            height={24}
            alt="close"
          />
        </div>
        <div>
          <form onSubmit={patchClick} className={styles.Modalform}>
            <p>댓글 내용</p>
            <textarea
              className={styles.InputContent}
              type="text"
              placeholder="수정할 내용을 입력해주세요"
              value={content} // value 설정
              onChange={contentHandle}
            ></textarea>
            {btnState === "addbtn" ? (
              <button className={styles.addbtn}>수정</button>
            ) : (
              <button
                onClick={(e) => e.preventDefault()}
                className={styles.addbtnfalse}
              >
                수정
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
