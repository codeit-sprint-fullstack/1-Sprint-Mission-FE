import styles from "./Chat.module.css";
import Image from "next/image";
import profile from "@/images/ic_profile.png";
import kebab from "@/images/ic_kebab.png";
import { timeAgo } from "@/utils/timeAgo";
import { useState } from "react";

export default function Chat({ comments }) {
  const [isOpen, setIsOpen] = useState(null);

  const toggleDropdown = (id) => {
    setIsOpen(isOpen === id ? null : id);
  };

  const handleEdit = (comment) => {
    console.log("Editing comment:", comment);
    setIsOpen(null);
  };

  const handleDelete = (id) => {
    console.log("Deleting comment with id:", id);
    setIsOpen(null);
  };

  return (
    <div className={styles.container}>
      {comments.list.map((comment) => (
        <div key={comment.id} className={styles.item}>
          <div className={styles.contentContainer}>
            <p className={styles.content}>{comment.content}</p>
            <Image
              src={kebab}
              className={styles.kebab}
              onClick={() => toggleDropdown(comment.id)}
            />
          </div>
          {isOpen === comment.id && (
            <div className={styles.dropdown}>
              <div
                className={styles.dropdownItem}
                onClick={() => handleEdit(comment)}
              >
                수정하기
              </div>
              <div
                className={styles.dropdownItem}
                onClick={() => handleDelete(comment.id)}
              >
                삭제하기
              </div>
            </div>
          )}
          <div className={styles.profileContainer}>
            <Image src={profile} className={styles.profile} alt="profile" />
            <div className={styles.profileInfo}>
              <p className={styles.name}>{comment.writer.nickname}</p>
              <p className={styles.date}>{timeAgo(comment.createdAt)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
