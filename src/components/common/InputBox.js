import React from "react";
import styles from "./InputBox.module.css";

function RegistrationInput({
  headerText,
  placeholderText,
  inputText,
  handleinputText,
  validationActive = false,
  validationMessage,
}) {
  return (
    <section className={styles.inputContainer}>
      <div className={styles.inputHeader}>
        <span>{headerText}</span>
      </div>
      <input
        className={validationActive ? styles.inputError : styles.defaultBox}
        type={"text"}
        value={inputText}
        onChange={handleinputText}
        placeholder={placeholderText}
      />
      {validationActive && <span className={styles.errorText}>{validationMessage}</span>}
    </section>
  );
}

export default RegistrationInput;
