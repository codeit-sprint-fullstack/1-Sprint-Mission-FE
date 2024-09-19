import { useEffect, useState } from "react";
import style from "./CommentFrom.module.css";

export default function CommentFrom({ Handler, mode }) {
  const [value, setValue] = useState("");
  const [activateButton, setActivateButton] = useState(style.buttonOff);
  const [title, setTitle] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    if (mode === "자유게시판") {
      setValue("");
      setTitle("댓글달기");
      setPlaceholder("댓글을 입력해주세요.");
    } else if (mode === "중고마켓") {
      setValue("");
      setTitle("문의하기");
      setPlaceholder(
        "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      );
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

    if (activateButton === style.buttonOn) {
      Handler(value);
      setValue("");
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
        placeholder={placeholder}
      />
      <div className={style.buttonCotaner}>
        <button
          className={`${style.CommentFromButton} ${style.font16} ${activateButton}`}
          onClick={buttonHandler}
        >
          등록
        </button>
      </div>
    </form>
  );
}
