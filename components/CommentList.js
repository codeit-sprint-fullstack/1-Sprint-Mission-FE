// Comment.jsx
import styles from "@/styles/CommentList.module.css";
import { useState } from "react";
import Image from "next/image";
import axios from "@/lib/axios.js";

export default function Comment({ comment }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/comment/${id}`);
      alert("댓글이 삭제되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentTitleContainer}>
        <div className={styles.commentTitle}>{comment.content}</div>
        <div className={styles.commentTitleDropdown}>
          <Image
            src="/ic_kebab.png"
            alt="옵션 메뉴"
            width={24}
            height={24}
            onClick={toggleDropdown}
            className={styles.commentTitleDropdownBtn}
          />
          {isOpen && (
            <div className={styles.commentTitleDropdownBox}>
              <button className={styles.commentTitleDropdownBoxModify}>
                수정하기
              </button>
              <button
                className={styles.commentTitleDropdownBoxDelete}
                onClick={() => handleDelete(comment.id)}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.commentInformation}>
        <Image
          src="/ic_profile.png"
          alt="프로필 이미지"
          width={32}
          height={32}
          className={styles.commentProfile}
        />
        <div className={styles.commentInformationFlex}>
          <span className={styles.commentInformationNickname}>똑똑한판다</span>
          <span className={styles.commentInformationTime}>1시간 전</span>
        </div>
      </div>
    </div>
  );
}
