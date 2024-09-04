import React from "react";
import styles from "./InputArea.module.css";

function InputArea({
  //헤더 사용 여부 > 전달하지 않으면 그리지 않음
  headerText,
  customGap, // gap 크기를 동적으로 변경 > 기본값은 CSS에서 12px

  //Area 기본 Props
  placeholderText = "입력해주세요",
  inputValue = "",

  //input 태그 핸들러
  handleInputAreaOnChange,
  handleInputAreaOnBlur,

  //에러 관리
  InputErrorState = false,
  validationMessage = "입력 오류입니다.",
}) {
  return (
    <div className={styles.AreaContainer} style={{ gap: customGap ? customGap : '' }}>
      {headerText && <div className={styles.headerText}>{headerText}</div>}
      <textarea
        className={InputErrorState ? styles.inputError : styles.defaultBox}
        value={inputValue}
        onChange={handleInputAreaOnChange}
        onBlur={handleInputAreaOnBlur}
        placeholder={placeholderText}
      />
      {InputErrorState && (
        <span className={styles.errorText}>{validationMessage}</span>
      )}
    </div>
  );
}

export default InputArea;
