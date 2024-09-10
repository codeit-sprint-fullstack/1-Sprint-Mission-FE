import React, { useState } from "react";
import styles from "./InputBar.module.css";

function InputBar({
  //헤더 사용 여부 > 전달하지 않으면 그리지 않음
  headerText,
  style = {}, // 가변 스타일

  //input 기본 Props
  placeholder = "입력해주세요",
  type = "text",

  //input 태그 핸들러
  onChange = () => {},
  onBlur = () => {},

  //에러 관리
  inputError = false,
  validationMessage = "입력 오류입니다.",
}) {
  const [value, setValue] = useState("");

  const handleOnChange = (e) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <div
      className={styles.inputContainer}
      style={{
        gap: style?.gap ? style.gap : undefined,
        width: style?.width ? style.width : undefined,
      }}
    >
      {headerText && <div className={styles.inputHeader}>{headerText}</div>}
      <input
        className={inputError ? styles.inputError : styles.defaultBox}
        type={type}
        value={value}
        onChange={handleOnChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {inputError && (
        <span className={styles.errorText}>{validationMessage}</span>
      )}
    </div>
  );
}

export default InputBar;
