import { useState } from "react";
import style from "./CommentFrom.module.css";

export default function CommentFrom({ postHandler }) {
  const [value, setValue] = useState("");
  const [activateButton, setActivateButton] = useState(style.button_off);

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

    if (activateButton === style.button_on) {
      postHandler(value);
      setValue("");
    }
  };

  return (
    <form className={style.CommentFrom_form}>
      <label
        className={`${style.CommentFrom_label} ${style.font16}`}
        htmlFor="comment"
      >
        댓글달기
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
          등록
        </button>
      </div>
    </form>
  );
}
