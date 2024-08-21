import React from "react";
import styles from "./InputBox.module.css";

function InputBox({
  headerText,
  placeholderText,
  inputText,
  handleinputText,
  handleKeyPress,
  inputError = false,
  validationMessage,
}) {
  return (
    <section className={styles.inputContainer}>
      <div className={styles.inputHeader}>
        <span>{headerText}</span>
      </div>
      <input
        className={inputError ? styles.inputError : styles.defaultBox}
        type={"text"}
        value={inputText}
        onChange={handleinputText}
        onKeyPress={handleKeyPress}
        placeholder={placeholderText}
      />
      {inputError && (
        <span className={styles.errorText}>{validationMessage}</span>
      )}
    </section>
  );
}

export default InputBox;
