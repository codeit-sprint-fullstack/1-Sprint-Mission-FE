import styles from "@styles/PostDetail.module.css";
import Image from "next/image";
import { useState } from "react";

import kebabIcon from "@images/ic_kebab.svg";

const PostDetail = ({
  title = "맥북이요",
  content = "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
  nickname = "총명한 판다",
  date = "2024.01.02",
  likes = 123,
}) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("댓글 등록:", comment);
    setComment("");
  };

  const isFormValid = comment !== "";

  return (
    <div className={styles.postDetail}>
      <div className={styles.titleContainer}>
        <span className="text-xl bold">{title}</span>
        <Image src={kebabIcon} alt="drop down" width={24} height={24} />
      </div>
      <form
        className={styles.commentInputContainer}
        onSubmit={handleCommentSubmit}
      >
        <label htmlFor="comment" className="text-lg semibold">
          댓글 달기
        </label>
        <textarea
          id="comment"
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={styles.textarea}
        />
        <button
          type="submit"
          className={`${styles.submitButton} ${
            isFormValid ? styles.active : ""
          } text-lg semibold`}
          disabled={!isFormValid}
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default PostDetail;
