import React, { useState } from "react";
import styles from "./InputBarPassword.module.css";

function InputBarPassword({
  //헤더 사용 여부 > 전달하지 않으면 그리지 않음
  headerText,
  customGap, // gap 크기를 동적으로 변경 > 기본값은 CSS에서 12px

  //input 기본 Props
  placeholderText = "입력해주세요",
  inputValue = "",

  //input 태그 핸들러
  handleInputOnChange,
  handleInputOnBlur,

  //에러 관리
  InputErrorState = false,
  validationMessage = "입력 오류입니다.",
}) {
  const [visibleToggle, setVisibleToggle] = useState(true);

  const handleVisibleToggle = () => {
    setVisibleToggle(!visibleToggle);
  };

  return (
    <div
      className={styles.mainContainer}
      style={{ gap: customGap ? customGap : "" }}
    >
      {headerText && <div className={styles.inputHeader}>{headerText}</div>}
      <div className={InputErrorState ? styles.inputError : styles.defaultBox}>
        <input
          className={styles.inputBox}
          type="password"
          value={inputValue}
          onChange={handleInputOnChange}
          onBlur={handleInputOnBlur}
          placeholder={placeholderText}
        />
        <button onClick={handleVisibleToggle}>
          {visibleToggle ? (
            <img src="/images/icon/ic_visible_on.svg" />
          ) : (
            <img src="/images/icon/ic_visible_off.svg" />
          )}
        </button>
      </div>

      {InputErrorState && (
        <span className={styles.errorText}>{validationMessage}</span>
      )}
    </div>
  );
}

export default InputBarPassword;
