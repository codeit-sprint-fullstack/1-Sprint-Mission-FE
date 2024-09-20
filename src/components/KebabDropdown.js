import { useState } from "react";
import styles from "@styles/KebabDropdown.module.css";
import Image from "next/image";

import KebabIcon from "@images/ic_kebab.svg";

const KebabDropdown = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEdit = () => {
    setIsOpen(false);
    onEdit();
  };

  const handleDelete = () => {
    setIsOpen(false);
    onDelete();
  };

  return (
    <div className={styles.dropdownContainer}>
      <Image
        src={KebabIcon}
        alt="drop down"
        width={24}
        height={24}
        onClick={toggleDropdown}
        className={styles.kebabIcon}
      />
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div
            onClick={handleEdit}
            className={`${styles.dropdownItem} text-lg regular`}
          >
            수정하기
          </div>
          <div
            onClick={handleDelete}
            className={`${styles.dropdownItem} text-lg regular`}
          >
            삭제하기
          </div>
        </div>
      )}
    </div>
  );
};

export default KebabDropdown;
