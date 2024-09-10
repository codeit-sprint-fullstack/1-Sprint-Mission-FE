import { useEffect, useState } from "react";
import style from "./CommentFrom.module.css";

export default function CommentFrom({
  Handler,
  mode,
  patchCommend,
  setPaychCommend,
}) {
  const [value, setValue] = useState("");
  const [activateButton, setActivateButton] = useState(style.button_off);
  const [title, setTitle] = useState("댓글달기");
  const [button, setButton] = useState("등록");

  useEffect(() => {
    if (mode === "등록") {
      setValue("");
      setTitle("댓글달기");
      setButton("등록");
    } else if (mode === "수정") {
      setValue(patchCommend.contentValue);
      setTitle("댓글수정");
      setButton("수정");
      setActivateButton(style.button_on);
    }
  }, []);

  // value 값 일치 함수
  const valueChangeHandler = (e) => {
    setValue(e.target.value);

    if (value !== "") {
      setActivateButton(style.button_on);
    }
  };

  // 버튼 비/활성화 함수
  const buttonChangeHAndler = () => {
    if (value === "") {
      setActivateButton(style.button_off);
    } else {
      setActivateButton(style.button_on);
    }
  };

  // 버튼 동작 함수(댓글 추가)
  const buttonHandler = (e) => {
    e.preventDefault();

    if (activateButton === style.button_on && mode === "등록") {
      Handler(value);
      setValue("");
    } else if (activateButton === style.button_on && mode === "수정") {
      if (patchCommend.contentValue === value) {
        setPaychCommend({ boolinValue: false, contentValue: "", id: '', idx: "" });
      } else {
        Handler(value);
        setPaychCommend({ boolinValue: false, contentValue: "", id: '', idx: "" });
      }
    }
  };

  return (
    <form className={style.CommentFrom_form}>
      <label
        className={`${style.CommentFrom_label} ${style.font16}`}
        htmlFor="comment"
      >
        {title}
      </label>
      <textarea
        className={`${style.CommentFrom_input} ${style.font16}`}
        id="comment"
        value={value}
        onChange={valueChangeHandler}
        onKeyUp={buttonChangeHAndler}
        placeholder="댓글을 입력해주세요."
      />
      <div className={style.CommentFrom_button_cotaner}>
        <button
          className={`${style.CommentFrom_button} ${style.font16} ${activateButton}`}
          onClick={buttonHandler}
        >
          {button}
        </button>
      </div>
    </form>
  );
}
