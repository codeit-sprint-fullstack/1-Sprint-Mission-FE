import { useState } from "react";
import ic_arrow_down from "../public/images/ic_arrow_down.png";
import ic_sort from "../public/images/ic_sort.png";
import styles from "@/styles/searchBar.module.css";
import Image from "next/image";

function DropDownBox({ onOrderChange, order, isMobile = false }) {
  const [dropView, setDropView] = useState(false);
  const viewDropbox = () => {
    setDropView((e) => !e);
  };
  const handleOrderChange = (e) => onOrderChange(e);
  const dropDownBox = {
    recent: "최신순",
    favorite: "좋아요순",
  };
  return (
    <div>
      <div className={styles.search_order_container} onClick={viewDropbox}>
        <button className={styles.order_drop_btn}>
          {!isMobile && dropDownBox[order]}
        </button>
        <Image
          className={styles.ic_arrow_down}
          src={isMobile ? ic_sort : ic_arrow_down}
          alt="드롭다운아이콘"
        ></Image>
      </div>
      {dropView && (
        <div className={styles.dropbox_list}>
          <button
            className={styles.firstdrop}
            name="order"
            value="recent"
            onClick={handleOrderChange}
          >
            {dropDownBox.recent}
          </button>
          <button
            className={styles.lastdrop}
            name="order"
            value="favorite"
            onClick={handleOrderChange}
          >
            {dropDownBox.favorite}
          </button>
        </div>
      )}
    </div>
  );
}

export default DropDownBox;
