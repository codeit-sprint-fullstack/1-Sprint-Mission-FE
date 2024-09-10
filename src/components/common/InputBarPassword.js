import React, { useState } from "react";
import styles from "./InputBarPassword.module.css";

function InputBarPassword({
  //헤더 사용 여부 > 전달하지 않으면 그리지 않음
  headerText,
  style, // 가변 스타일

  //input 기본 Props
  placeholder = "입력해주세요",

  //input 태그 핸들러
  onChange = () => {},
  onBlur = () => {},

  //에러 관리
  inputError = false,
  validationMessage = "입력 오류입니다.",
}) {
  const [visibleToggle, setVisibleToggle] = useState(true);
  const [value, setValue] = useState("");

  const handleVisibleToggle = () => {
    setVisibleToggle(!visibleToggle);
  };

  const handleOnChange = (e) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <div
      className={styles.mainContainer}
      style={{
        gap: style?.gap ? style.gap : undefined,
        width: style?.width ? style.width : undefined,
      }}
    >
      {headerText && <div className={styles.inputHeader}>{headerText}</div>}
      <div className={inputError ? styles.inputError : styles.defaultBox}>
        <input
          className={styles.inputBox}
          type={visibleToggle ? "password" : "text"}
          value={value}
          onChange={handleOnChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
        <button onClick={handleVisibleToggle}>
          {visibleToggle ? (
            <img src="/images/icon/ic_visible_on.svg" />
          ) : (
            <img src="/images/icon/ic_visible_off.svg" />
          )}
        </button>
      </div>

      {inputError && (
        <span className={styles.errorText}>{validationMessage}</span>
      )}
    </div>
  );
}

export default InputBarPassword;
