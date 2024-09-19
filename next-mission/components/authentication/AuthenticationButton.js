import { useEffect, useState } from "react";
import style from './AuthenticationButton.module.css'

export default function AuthenticationButton({ mode, postHandler }) {
  const [text, setText] = useState("로그인");
  const [activateButton, setActivateButton] = useState(style.buttonOff);

  useEffect(() => {
    if (mode === "login") {
      setText("로그인");
    } else if (mode === "signup") {
      setText("회원가입");
    }
  });

  return (
    <>
      <button className={`${style.AuthenticationButton} ${activateButton}`}>{text}</button>
    </>
  );
}
