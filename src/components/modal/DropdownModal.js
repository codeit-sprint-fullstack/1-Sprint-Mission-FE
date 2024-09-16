import React from "react";
import styles from "./DropdownModal.module.css";

function DropdownModal({
  //드랍다운 li 데이터
  options,

  //OnClick 핸들
  onClick = () => {},

  //커스텀 스타일
  style
}) {
  return (
    <ul
      className={styles.dropdownBox}
      style={{
        width: style?.width,
        marginTop: style?.marginTop,
        borderRadius: style?.borderRadius
      }}
    >
      {options.map((option) => (
        <li key={option} className={styles.optionList} onClick={onClick}>
          {option}
        </li>
      ))}
    </ul>
  );
}

export default DropdownModal;
