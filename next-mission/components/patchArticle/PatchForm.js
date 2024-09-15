import { useState } from "react";
import style from "../postArticle/PostForm.module.css";
import { useRouter } from "next/router";
import instance from "@/lib/axios";

export default function PatchForm({ data }) {
  const [activateButton, setActivateButton] = useState(style.button_on);
  const [value, setValue] = useState({
    title: data.title,
    content: data.content,
  });
  const defaultValue = { title: data.title, content: data.content };
  const router = useRouter();

  // value 값 일치 함수
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    if (value.title !== "" && value.content !== "") {
      setActivateButton(style.button_on);
    }
  };

  // 버튼 비/활성화 함수
  const onKetUpHandler = () => {
    if (value.title !== "" && value.content !== "") {
      setActivateButton(style.button_on);
    } else {
      setActivateButton(style.button_off);
    }
  };

  // 수정 함수
  const onClickHandler = async (e) => {
    e.preventDefault();

    if (
      defaultValue.title === value.title &&
      defaultValue.content === value.content
    ) {
      router.push(`/freeNoticeBoard/${data.id}`);
    } else {
      await instance.patch(`/noticeBoards/${data.id}`, value);
      router.push(`/freeNoticeBoard/${data.id}`);
    }
  };

  return (
    <form className={style.PostForm_form}>
      <div className={style.PostForm_subject}>
        <div className={style.PostForm_title}>게시글 수정</div>
        <button
          className={`${style.PostForm_button} ${style.font16} ${activateButton}`}
          onClick={onClickHandler}
        >
          수정
        </button>
      </div>
      <label className={style.PostForm_label} htmlFor="title">
        *제목
      </label>
      <input
        className={`${style.PostForm_input} ${style.input_title} ${style.font16}`}
        id="title"
        placeholder="제목을 입력해주세요"
        name="title"
        value={value.title}
        onChange={onChangeHandler}
        onKeyUp={onKetUpHandler}
      />
      <label className={style.PostForm_label} htmlFor="content">
        *내용
      </label>
      <textarea
        className={`${style.PostForm_input} ${style.input_contents} ${style.font16}`}
        id="content"
        placeholder="내용을 입력해주세요"
        name="content"
        value={value.content}
        onChange={onChangeHandler}
        onKeyUp={onKetUpHandler}
      />
    </form>
  );
}
