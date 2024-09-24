import Image from "next/image";
import styles from "./KebabDropDown.module.css";
import kebab from "@/images/ic_kebab.png";
import { useState } from "react";

export default function CommentDropDown({ onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className={styles.dropDownContainer}>
      <Image
        className={styles.kebab}
        src={kebab}
        alt="kebab"
        onClick={toggleDropDown}
      />
      {isOpen && (
        <div className={styles.dropDown}>
          <a className={styles.dropDownText}>수정하기</a>
          <a onClick={handleDelete}>삭제하기</a>
        </div>
      )}
    </div>
  );
}
