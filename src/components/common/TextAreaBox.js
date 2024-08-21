import React from "react";
import styles from "./TextAreaBox.module.css";

function TextAreaBox({
  headerText,
  placeholderText,
  inputText,
  handleinputText,
  inputError = false,
  validationMessage,
}) {
  return (
    <section className={styles.AreaContainer}>
      <span className={styles.headerText}>{headerText}</span>
      <textarea
        className={inputError ? styles.inputError : styles.defaultBox}
        value={inputText}
        onChange={handleinputText}
        onBlur={handleinputText}
        placeholder={placeholderText}
      />
      {inputError && (
        <span className={styles.errorText}>{validationMessage}</span>
      )}
    </section>
  );
}

export default TextAreaBox;
