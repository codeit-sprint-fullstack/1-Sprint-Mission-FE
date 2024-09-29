import styles from "@/styles/Comment.module.css";
import { useState } from "react";
import Image from "next/image";
import deleteComment from "@/lib/axios";

export default function comment({ comment }) {
  const [isOpen, setIsOpen] = useState();

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.comment_container}>
        <div className={styles.comment_title_container}>
          <div className={styles.comment_title}>{comment.content}</div>
          <div className={styles.comment_title_dropdown}>
            <Image
              src="/ic_kebab.png"
              alt="ic_kebab"
              width={24}
              height={24}
              onClick={toggleDropDown}
              className={styles.comment_title_dropdown_btn}
            />
            {isOpen && (
              <div className={styles.comment_title_dropdown_box}>
                <button className={styles.comment_title_dropdown_box_modify}>
                  수정하기
                </button>
                <button
                  className={styles.comment_title_dropdown_box_delete}
                  onClick={() => deleteComment(comment.id)}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.comment_information}>
          <Image
            src="/ic_profile.png"
            className={styles.comment_profile}
            width={32}
            height={32}
            alt="user_profile"
          />
          <div className={styles.comment_information_flex}>
            <span className={styles.comment_information_nickname}>
              {comment.writer.nickname}
            </span>
            <span className={styles.comment_information_time}>1시간 전</span>
          </div>
        </div>
      </div>
    </>
  );
}
