import React from "react";
import styles from "./DropdownModal.module.css";

function DropdownModal({
  //드랍다운 li 데이터
  options,

  //OnClick 핸들
  handleOnClick = () => {},

  //커스텀 스타일
  customWidth,
  customMarginTop,
  customBorderRadius,
}) {
  return (
    <ul
      className={styles.dropdownBox}
      style={{
        width: customWidth ? customWidth : "",
        marginTop: customMarginTop ? customMarginTop : "",
        borderRadius: customBorderRadius ? customBorderRadius : "",
      }}
    >
      {options.map((option) => (
        <li key={option} className={styles.optionList} onClick={handleOnClick}>
          {option}
        </li>
      ))}
    </ul>
  );
}

export default DropdownModal;
