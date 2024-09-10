import { useState, useRef, useEffect } from "react";
import styles from "./DropDown.module.scss";
import sortIcon from "../../public/assets/icons/ic_sort.svg";
import arrowDownIcon from "../../public/assets/icons/ic_arrow_down.svg";
import Image from "next/image";

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
    <div className={styles.DropDown}>
      <button onClick={toggleDropDown} ref={dropDownRef}>
        <div>
          {sortBy === "recent" ? "최신순" : "인기순"}
          <Image src={arrowDownIcon} alt="arrow down icon" />
        </div>
        <div className={styles["mobile-only"]}>
          <Image src={sortIcon} alt="sort icon" />
        </div>
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
