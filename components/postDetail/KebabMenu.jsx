import React, { useState } from "react";
import styles from "./KebabMenu.module.css";
import { useClickOutside } from "@/hooks/useClickOutside";

const KebabMenu = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const menuRef = useClickOutside(closeMenu);

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  const validOptions =
    Array.isArray(options) && options.length > 0 ? options : [];

  return (
    <div className={styles.kebabMenuWrapper} ref={menuRef}>
      <div className={styles.kebabIcon} onClick={toggleMenu}>
        <img src="/images/ic_kebab.svg" alt="Menu" width={24} height={24} />
      </div>
      {isOpen && validOptions.length > 0 && (
        <ul
          className={`${styles.optionList} ${isClosing ? styles.closing : ""}`}
        >
          {validOptions.map((option, index) => (
            <li
              key={index}
              className={styles.optionItem}
              onClick={() => {
                option.onClick();
                closeMenu();
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KebabMenu;
