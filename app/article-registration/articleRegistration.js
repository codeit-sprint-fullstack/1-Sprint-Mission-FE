"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { createArticle } from "@/lib/axios";
import Input from "@/app/components/input";
import TextArea from "@/app/components/TextArea";

import {
  MIN_TITLE_LENGTH,
  WARN_MIN_TITLE_LENGTH,
  MAX_TITLE_LENGHT,
  WARN_MAX_TITLE_LENGHT,
  MIN_CONTENT_LENGTH,
  WARN_MIN_CONTENT_LENGTH,
  MAX_CONTENT_LENGHT,
  WARN_MAX_CONTENT_LENGHT,
  VALID_VALUE,
} from "@/app/constants/article";

import style from "./article-registration.module.css";

export function ArticleRegistration() {
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

  const handleRegistArticle = () => {
    if (titleValid !== 0 || contentValid !== 0) {
      return;
    }

    // 등록 api 호출 + 페이지 이동
    createArticle(title, content).then((data) => {
      const path = `/bulletin-board/${data.id}`;
      router.push(path);
    });
  };

  const validateRegistValue = () => {
    if (titleValid === VALID_VALUE && contentValid === VALID_VALUE) {
      setRegistBtnClass(`${style["btn-regist"]}`);
    } else {
      setRegistBtnClass(`${style["btn-regist-invalid"]}`);
    }
  };

  const validateTitle = (value) => {
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
      return (
        <p className="text-warn">{MIN_TITLE_LENGTH}자 이상 입력해주세요</p>
      );
    } else if (titleValid === WARN_MAX_TITLE_LENGHT) {
      return (
        <p className="text-warn">{MAX_TITLE_LENGHT}자 이하로 입력해주세요</p>
      );
    } else {
      return undefined;
    }
  };

  const validateContent = (value) => {
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
      return (
        <p className="text-warn">{MIN_CONTENT_LENGTH}자 이상 입력해주세요</p>
      );
    } else if (contentValid === WARN_MAX_CONTENT_LENGHT) {
      return (
        <p className="text-warn">{MAX_CONTENT_LENGHT}자 이하로 입력해주세요</p>
      );
    } else {
      return undefined;
    }
  };

  useEffect(() => {
    validateRegistValue();
  }, [titleValid, contentValid]);

  return (
    <div className={style.main}>
      <div className={style.content}>
        <div className={topBarClass}>
          <p className={topBarTextClass}>게시판 쓰기</p>
          <button className={registBtnClass} onClick={handleRegistArticle} />
        </div>
        <div className={style["title-input-set"]}>
          <p className={labelClass}>*제목</p>
          <div className={style["input-frame"]}>
            <Input
              validateFunc={validateTitle}
              onChange={handleTitleChange}
              getValid={getTitleValid}
              placeholder={"제목을 입력해주세요"}
            ></Input>
            {getTitleWarn()}
          </div>
        </div>
        <div className={style["content-text-area-set"]}>
          <p className={labelClass}>*내용</p>
          <div className={style["text-area-frame"]}>
            <TextArea
              validateFunc={validateContent}
              onChange={handleContentChange}
              getValid={getContentValid}
              placeholder={"내용을 입력해주세요"}
            ></TextArea>
            {getContentWarn()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleRegistration;
