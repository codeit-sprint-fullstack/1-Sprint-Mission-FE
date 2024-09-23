import { useEffect, useState } from "react";
import style from "./CommentFrom.module.css";

export default function CommentFrom({
  Handler,
  mode,
  patchCommend,
  setPatchCommend,
}) {
  const [value, setValue] = useState("");
  const [activateButton, setActivateButton] = useState(style.buttonOff);
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
      setActivateButton(style.buttonOn);
    }
  }, []);

  // value 값 일치 함수
  const valueChangeHandler = (e) => {
    setValue(e.target.value);

    if (value !== "") {
      setActivateButton(style.buttonOn);
    }
  };

  // 버튼 비/활성화 함수
  const buttonChangeHAndler = () => {
    if (value === "") {
      setActivateButton(style.buttonOff);
    } else {
      setActivateButton(style.buttonOn);
    }
  };

  // 버튼 동작 함수(댓글 추가)
  const buttonHandler = (e) => {
    e.preventDefault();

    if (activateButton === style.buttonOn && mode === "등록") {
      Handler(value);
      setValue("");
    } else if (activateButton === style.buttonOn && mode === "수정") {
      if (patchCommend.contentValue === value) {
        setPatchCommend({
          boolinValue: false,
          contentValue: "",
          id: "",
          idx: "",
        });
      } else {
        Handler(value);
        setPatchCommend({
          boolinValue: false,
          contentValue: "",
          id: "",
          idx: "",
        });
      }
    }
  };

  return (
    <form className={style.CommentFromForm}>
      <label
        className={`${style.CommentFromLabel} ${style.font16}`}
        htmlFor="comment"
      >
        {title}
      </label>
      <textarea
        className={`${style.CommentFromInput} ${style.font16}`}
        id="comment"
        value={value}
        onChange={valueChangeHandler}
        onKeyUp={buttonChangeHAndler}
        placeholder="댓글을 입력해주세요."
      />
      <div className={style.buttonCotaner}>
        <button
          className={`${style.CommentFromButton} ${style.font16} ${activateButton}`}
          onClick={buttonHandler}
        >
          {button}
        </button>
      </div>
    </form>
  );
}
