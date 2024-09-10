import { useState } from "react";
import style from "./PostForm.module.css";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

export default function PostForm() {
  const [activateButton, setActivateButton] = useState(style.button_off);
  const [value, setValue] = useState({ title: "", content: "" });
  const router = useRouter();

  // value 값 일치 함수
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // 버튼 비/활성화 함수
  const onKetUpHandler = () => {
    if (value.title !== "" && value.content !== "") {
      setActivateButton(style.button_on);
    } else {
      setActivateButton(style.button_off);
    }
  };

  // 포스트 함수
  const postNoticeBoard = async (e) => {
    e.preventDefault();

    if (activateButton === style.button_on) {
      const res = await axios.post("/noticeBoards", value);
      const id = res.data.id;
      router.push(`/freeNoticeBoard/${id}`);
    }
  };

  return (
    <form className={style.PostForm_form}>
      <div className={style.PostForm_subject}>
        <div className={style.PostForm_title}>게시글 쓰기</div>
        <button
          className={`${style.PostForm_button} ${style.font16} ${activateButton}`}
          onClick={postNoticeBoard}
        >
          등록
        </button>
      </div>
      <label className={style.PostForm_label} htmlFor="title">
        *제목
      </label>
      <input
        className={`${style.PostForm_input} ${style.input_title} ${style.font16}`}
        id="title"
        name="title"
        placeholder="제목을 입력해주세요"
        onChange={onChangeHandler}
        onKeyUp={onKetUpHandler}
      />
      <label className={style.PostForm_label} htmlFor="content">
        *내용
      </label>
      <textarea
        className={`${style.PostForm_input} ${style.input_contents} ${style.font16}`}
        id="content"
        name="content"
        placeholder="내용을 입력해주세요"
        onChange={onChangeHandler}
        onKeyUp={onKetUpHandler}
      />
    </form>
  );
}
