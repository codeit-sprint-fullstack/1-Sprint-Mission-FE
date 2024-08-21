import React from "react";
import styles from "./TextAreaBox.module.css";

function TextAreaBox({
  headerText,
  placeholderText,
  inputText,
  handleinputText,
  validationActive = false,
  validationMessage,
}) {
  return (
    <section className={styles.AreaContainer}>
      <span className={styles.headerText}>{headerText}</span>
      <textarea
        className={validationActive ? styles.inputError : ""}
        value={inputText}
        onChange={handleinputText}
        onBlur={handleinputText}
        placeholder={placeholderText}
      />
      {validationActive && (
        <span className="errorText">{validationMessage}</span>
      )}
    </section>
  );
}

export default TextAreaBox;
