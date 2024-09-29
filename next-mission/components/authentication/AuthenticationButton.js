import { useEffect, useState } from "react";
import style from "./AuthenticationButton.module.css";

export default function AuthenticationButton({ mode, postHandler, readyOk }) {
  const [text, setText] = useState("로그인");
  const [activateButton, setActivateButton] = useState(style.buttonOff);
  const [onClickHandler, setOnClickHandler] = useState(() => {});

  useEffect(() => {
    if (mode === "login") {
      setText("로그인");
    } else if (mode === "signup") {
      setText("회원가입");
    }

    if (readyOk) {
      setActivateButton(style.buttonOn);
      setOnClickHandler(() => postHandler);
    } else if (!readyOk) {
      setActivateButton(style.buttonOff);
      setOnClickHandler(() => {});
    }
  }, [readyOk]);

  return (
    <>
      <button
        className={`${style.AuthenticationButton} ${activateButton}`}
        onClick={onClickHandler}
      >
        {text}
      </button>
    </>
  );
}
