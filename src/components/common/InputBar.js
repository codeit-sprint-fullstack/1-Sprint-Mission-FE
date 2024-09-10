import React, { useState } from "react";
import styles from "./InputBar.module.css";

function InputBar({
  //헤더 사용 여부 > 전달하지 않으면 그리지 않음
  headerText,
  customGap, // gap 크기를 동적으로 변경 > 기본값은 CSS에서 12px

  //input 기본 Props
  placeholder = "입력해주세요",
  type = "text",

  //input 태그 핸들러
  onChange = () => {},
  onBlur = () => {},

  //에러 관리
  InputErrorState = false,
  validationMessage = "입력 오류입니다.",
}) {

  const [value, setValue] = useState("");

  const handleOnChange = (e) => {
    setValue(e.target.value);
    onChange;
  };

  return (
    <div
      className={styles.inputContainer}
      style={{ gap: customGap ? customGap : "" }}
    >
      {headerText && <div className={styles.inputHeader}>{headerText}</div>}
      <input
        className={InputErrorState ? styles.inputError : styles.defaultBox}
        type={type}
        value={value}
        onChange={handleOnChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {InputErrorState && (
        <span className={styles.errorText}>{validationMessage}</span>
      )}
    </div>
  );
}

export default InputBar;
