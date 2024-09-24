import React, { useState, useRef, useEffect } from "react";
import styles from "./KebabMenu.module.css";

const KebabMenu = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
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
