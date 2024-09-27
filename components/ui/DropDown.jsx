import { useState, useRef, useEffect } from "react";
import styles from "./DropDown.module.scss";
import assets from "@/variables/images";
import { IconContainer } from "./ImgContainers";

export default function DropDown({ setOrderBy, orderBy }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(0);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSorting = (order) => {
    setOrderBy(order);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.DropDown}>
      <button onClick={toggleDropDown} ref={dropDownRef}>
        <div className={styles.default}>
          {orderBy === "recent" ? "최신순" : "인기순"}
          <IconContainer src={assets.icons.arrowDown} alt="arrow down icon" />
        </div>
        <div className={styles["mobile-only"]}>
          <IconContainer src={assets.icons.sort} alt="sort icon" />
        </div>
      </button>

      {isOpen && (
        <ul>
          <li onClick={() => handleSorting("recent")}>최신순</li>
          <li onClick={() => handleSorting("like")}>인기순</li>
        </ul>
      )}
    </div>
  );
}
