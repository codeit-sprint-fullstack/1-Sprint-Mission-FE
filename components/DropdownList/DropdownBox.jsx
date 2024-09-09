import { useState } from "react";
import ic_arrow_down from "@/public/images/ic_arrow_down.png";
import ic_sort from "@/public/images/ic_sort.png";
import styles from "@/styles/searchBar.module.css";
import Image from "next/image";
import useWindowResize from "@/hooks/useWindowResize";

function DropdownBox({ onOrderChange, orderBy }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const changeDropbox = () => {
    setOpenDropdown((e) => !e);
  };
  const handleOrderChange = (e) => {
    onOrderChange(e);
    changeDropbox();
  };
  const dropDownBox = {
    recent: "최신순",
    favorite: "좋아요순",
  };
  const view = useWindowResize();

  return (
    <div>
      <div className={styles.search_order_container} onClick={changeDropbox}>
        <button className={styles.order_drop_btn}>
          {view !== "isMobile" && dropDownBox[orderBy]}
        </button>
        <Image
          className={styles.ic_arrow_down}
          src={view === "isMobile" ? ic_sort : ic_arrow_down}
          alt="드롭다운아이콘"
        ></Image>
      </div>
      {openDropdown && (
        <div className={styles.dropbox_list}>
          <button
            className={styles.firstdrop}
            value="recent"
            onClick={handleOrderChange}
          >
            {dropDownBox.recent}
          </button>
          <button
            className={styles.lastdrop}
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

export default DropdownBox;
