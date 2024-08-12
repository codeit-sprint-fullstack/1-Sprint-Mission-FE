import React from "react";
import "./RegistrationTextArea.css";

function RegistrationInput({
  headerText,
  placeholderText,
  inputText,
  handleinputText,
  validationActive = false,
  validationMessage,
}) {
  return (
    <section className="inputContainer">
      <div className="inputHeader">
        <span>{headerText}</span>
      </div>
      <textarea
        className={validationActive ? "textareaInputError" : "textareaInputStyle"}
        value={inputText}
        onChange={handleinputText}
        placeholder={placeholderText}
      />
      {validationActive && <span className="errorText">{validationMessage}</span>}
    </section>
  );
}

export default RegistrationInput;
