import Image from "next/image";
import styles from "./DropDown.module.css";
import arrow from "@/images/ic_arrow_down.png";
import mobileDropDown from "@/images/mobileDropDown.png";
import { useState } from "react";

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectOrder, setSelectOrder] = useState("최신순");

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectRecent = () => {
    setIsOpen(false);
    setSelectOrder("최신순");
  };

  return (
    <div className={styles.dropDownContainer}>
      <button className={styles.dropDownButton} onClick={toggleDropDown}>
        <span>{selectOrder}</span>
        <Image src={arrow} alt="arrow" />
        <Image
          className={styles.mobileDropDown}
          src={mobileDropDown}
          alt="mobileDropDown"
        />
      </button>
      {isOpen && (
        <div className={styles.dropDown}>
          <a className={styles.dropDownText} onClick={handleSelectRecent}>
            최신순
          </a>
          <a onClick={handleSelectRecent}>좋아요순</a>
        </div>
      )}
    </div>
  );
}
