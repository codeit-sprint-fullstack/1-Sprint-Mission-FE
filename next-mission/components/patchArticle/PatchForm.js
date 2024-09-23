import { useState } from "react";
import style from "../postArticle/PostForm.module.css";
import { useRouter } from "next/router";
import instance from "@/lib/axios";
import { notFound } from "next/navigation";

export default function PatchForm({ data }) {
  const [activateButton, setActivateButton] = useState(style.buttonOff);
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
      setActivateButton(style.buttonOn);
    }
  };

  // 버튼 비/활성화 함수
  const onKetUpHandler = () => {
    if (value.title !== "" && value.content !== "") {
      setActivateButton(style.buttonOn);
    } else {
      setActivateButton(style.buttonOff);
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
      try {
        await instance.patch(`/noticeBoards/${data.id}`, value);
        router.push(`/freeNoticeBoard/${data.id}`);
      } catch {
        return {
          notFound: true,
        };
      }
    }
  };

  return (
    <form className={style.PostFormForm}>
      <div className={style.subject}>
        <div className={style.title}>게시글 수정</div>
        <button
          className={`${style.PostFormButton} ${style.font16} ${activateButton}`}
          onClick={onClickHandler}
        >
          수정
        </button>
      </div>
      <label className={style.PostFormLabel} htmlFor="title">
        *제목
      </label>
      <input
        className={`${style.PostFormInput} ${style.inputTitle} ${style.font16}`}
        id="title"
        placeholder="제목을 입력해주세요"
        name="title"
        value={value.title}
        onChange={onChangeHandler}
        onKeyUp={onKetUpHandler}
      />
      <label className={style.PostFormLabel} htmlFor="content">
        *내용
      </label>
      <textarea
        className={`${style.PostFormInput} ${style.inputContents} ${style.font16}`}
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
