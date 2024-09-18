import styles from "@/styles/Comment.module.css";
import { useState } from "react";
import Image from "next/image";

export default function Comment({ comment }) {
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <div className={styles.commentText}>{comment.content}</div>
        <div className={styles.optionsMenu}>
          <Image
            src="/ic_kebab.png"
            alt="options"
            width={24}
            height={24}
            onClick={handleToggleOptions}
            className={styles.optionsButton}
          />
          {showOptions && (
            <div className={styles.dropdown}>
              <button className={styles.dropdownItem}>수정하기</button>
              <button className={styles.dropdownItem}>삭제하기</button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.commentInfo}>
        <Image
          src="/ic_profile.png"
          alt="user profile"
          width={32}
          height={32}
          className={styles.profileImage}
        />
        <div className={styles.userInfo}>
          <span className={styles.userName}>{comment.userName}</span>
          <span className={styles.timeStamp}>{comment.time}</span>
        </div>
      </div>
    </div>
  );
}
