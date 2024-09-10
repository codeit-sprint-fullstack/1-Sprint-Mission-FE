import Image from "next/image";

import arrowDown from "@images/arrowDownIcon.png";
import styles from "@styles/Dropdown.module.css";

function Dropdown() {
  return (
    <div className={styles.dropdown}>
      <span className={`${styles.dropdownContent} text-lg regular`}>
        최신순
      </span>
      <Image
        className={styles.arrowDown}
        src={arrowDown}
        alt="arrow down"
        width={24}
        height={24}
      />
    </div>
  );
}

export default Dropdown;
