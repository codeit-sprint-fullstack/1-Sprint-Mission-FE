"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { createArticle } from "@/lib/axios";
import Input from "../components/input";
import TextArea from "../components/TextArea";

import style from "./post-registration.module.css";

const MIN_TITLE_LENGTH = 2;
const WARN_MIN_TITLE_LENGTH = 402;
const MAX_TITLE_LENGHT = 30;
const WARN_MAX_TITLE_LENGHT = 430;

const MIN_CONTENT_LENGTH = 10;
const WARN_MIN_CONTENT_LENGTH = 410;
const MAX_CONTENT_LENGHT = 200;
const WARN_MAX_CONTENT_LENGHT = 600;

const VALID_VALUE = 0;

export function PostRegistration() {
  const [titleValid, setTitleValid] = useState(undefined);
  const [contentValid, setContentValid] = useState(undefined);
  const [registBtnClass, setRegistBtnClass] = useState(
    `${style["btn-regist-invalid"]}`
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const topBarClass = `flex flex-row items-center justify-between ${style["top-bar"]}`;
  const topBarTextClass = `font-bold ${style["top-bar-text"]}`;
  const labelClass = `font-bold ${style.label}`;

  const router = useRouter();

  const handleRegistPost = () => {
    if (titleValid !== 0 || contentValid !== 0) {
      return;
    }

    // 등록 api 호출 + 페이지 이동
    createArticle(title, content).then((data) => {
      console.log(data);
      const path = `/bulletin-board/${data.id}`;
      router.push(path);
    });
  };

  const validRegistValue = () => {
    if (titleValid === 0 && contentValid === 0) {
      setRegistBtnClass(`${style["btn-regist"]}`);
    } else {
      setRegistBtnClass(`${style["btn-regist-invalid"]}`);
    }
  };

  const titleValidate = (value) => {
    if (!value) {
      return undefined;
    }

    const castrdValue = value.toString();

    if (castrdValue.length < MIN_TITLE_LENGTH) {
      return WARN_MIN_TITLE_LENGTH;
    } else if (MAX_TITLE_LENGHT < castrdValue.length) {
      return WARN_MAX_TITLE_LENGHT;
    } else {
      return VALID_VALUE;
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const getTitleValid = (valid) => {
    setTitleValid(valid);
  };

  const getTitleWarn = () => {
    if (titleValid === WARN_MIN_TITLE_LENGTH) {
      return <p>{MIN_TITLE_LENGTH}자 이상 입력해주세요</p>;
    } else if (titleValid === WARN_MAX_TITLE_LENGHT) {
      return <p>{MAX_TITLE_LENGHT}자 이하로 입력해주세요</p>;
    } else {
      return undefined;
    }
  };

  const contentValidate = (value) => {
    if (!value) {
      return undefined;
    }

    const castrdValue = value.toString();

    if (castrdValue.length < MIN_CONTENT_LENGTH) {
      return WARN_MIN_CONTENT_LENGTH;
    } else if (MAX_CONTENT_LENGHT < castrdValue.length) {
      return WARN_MAX_CONTENT_LENGHT;
    } else {
      return VALID_VALUE;
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const getContentValid = (valid) => {
    setContentValid(valid);
  };

  const getContentWarn = () => {
    if (contentValid === WARN_MIN_CONTENT_LENGTH) {
      return <p>{MIN_CONTENT_LENGTH}자 이상 입력해주세요</p>;
    } else if (contentValid === WARN_MAX_CONTENT_LENGHT) {
      return <p>{MAX_CONTENT_LENGHT}자 이하로 입력해주세요</p>;
    } else {
      return undefined;
    }
  };

  useEffect(() => {
    validRegistValue();
  }, [titleValid, contentValid]);

  return (
    <div className={style.main}>
      <div className={style.content}>
        <div className={topBarClass}>
          <p className={topBarTextClass}>게시판 쓰기</p>
          <button className={registBtnClass} onClick={handleRegistPost} />
        </div>
        <div className={style["title-input-set"]}>
          <p className={labelClass}>*제목</p>
          <div className={style["input-frame"]}>
            <Input
              validateFunc={titleValidate}
              onChange={handleTitleChange}
              getValid={getTitleValid}
              placeholder={"제목을 입력해주세요"}
            ></Input>
          </div>
          {getTitleWarn()}
        </div>
        <div className={style["content-text-area-set"]}>
          <p className={labelClass}>*내용</p>
          <div className={style["text-area-frame"]}>
            <TextArea
              validateFunc={contentValidate}
              onChange={handleContentChange}
              getValid={getContentValid}
              placeholder={"내용을 입력해주세요"}
            ></TextArea>
          </div>
          {getContentWarn()}
        </div>
      </div>
    </div>
  );
}

export default PostRegistration;
