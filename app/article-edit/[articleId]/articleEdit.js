"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { setArticle } from "@/lib/axios";
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

import style from "./article-edit.module.css";

export function ArticleEdit({ articleId, data }) {
  const [newTitleValid, setNewTitleValid] = useState(VALID_VALUE);
  const [contentValid, setContentValid] = useState(VALID_VALUE);
  const [registBtnDisable, setRegistBtnDisable] = useState(false);
  const [newTitle, setNewTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const registBtnClass = `${style["btn-regist"]}`;
  const topBarClass = `flex flex-row items-center justify-between ${style["top-bar"]}`;
  const topBarTextClass = `font-bold ${style["top-bar-text"]}`;
  const labelClass = `font-bold ${style.label}`;

  const router = useRouter();

  const handleModifyArticle = () => {
    if (newTitleValid !== 0 || contentValid !== 0) {
      return;
    }

    setRegistBtnDisable(false);

    setArticle(articleId, newTitle, content).then((data) => {
      const path = `/bulletin-board/${data.id}`;
      router.push(path);
    });
  };

  const validateRegistValue = () => {
    if (newTitleValid === VALID_VALUE && contentValid === VALID_VALUE) {
      setRegistBtnDisable(false);
    } else {
      setRegistBtnDisable(true);
    }
  };

  const validatenewTitle = (value) => {
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

  const handleNewTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const getNewTitleValid = (valid) => {
    setNewTitleValid(valid);
  };

  const getnewTitleWarn = () => {
    if (newTitleValid === WARN_MIN_TITLE_LENGTH) {
      return (
        <p className="text-warn">{MIN_TITLE_LENGTH}자 이상 입력해주세요</p>
      );
    } else if (newTitleValid === WARN_MAX_TITLE_LENGHT) {
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
  }, [newTitleValid, contentValid]);

  return (
    <div className={style.main}>
      <div className={style.content}>
        <div className={topBarClass}>
          <p className={topBarTextClass}>게시글 수정하기</p>
          <button
            className={registBtnClass}
            onClick={handleModifyArticle}
            disabled={registBtnDisable}
          />
        </div>
        <div className={style["newTitle-input-set"]}>
          <p className={labelClass}>*제목</p>
          <div className={style["input-frame"]}>
            <Input
              validateFunc={validatenewTitle}
              onChange={handleNewTitleChange}
              getValid={getNewTitleValid}
              placeholder={"제목을 입력해주세요"}
              value={newTitle}
            ></Input>
            {getnewTitleWarn()}
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
              value={content}
            ></TextArea>
            {getContentWarn()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleEdit;
