import { useState, useRef, useEffect } from "react";
import styles from "./DropDown.module.scss";

export default function DropDown({ setSortBy, sortBy }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(0);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSorting = (order) => {
    setSortBy(order);
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
    <div className="DropDown">
      <button onClick={toggleDropDown} ref={dropDownRef}>
        {sortBy === "recent" ? "최신순" : "인기순"}
        <div className={styles["sort-icon"]} />
      </button>

      {isOpen && (
        <ul>
          <li onClick={() => handleSorting("recent")}>최신순</li>
          <li onClick={() => handleSorting("best")}>인기순</li>
        </ul>
      )}
    </div>
  );
}
