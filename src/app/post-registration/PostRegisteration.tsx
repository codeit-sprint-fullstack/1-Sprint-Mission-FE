"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { createPost } from "src/lib/api-post";
import Input from "src/app/components/input";
import TextArea from "src/app/components/TextArea";

import {
  MIN_NAME_LENGTH,
  WARN_MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  WARN_MAX_NAME_LENGTH,
  MIN_CONTENT_LENGTH,
  WARN_MIN_CONTENT_LENGTH,
  MAX_CONTENT_LENGHT,
  WARN_MAX_CONTENT_LENGHT,
  VALID_VALUE,
} from "../constants/post";

import style from "./post-registration.module.css";

export function PostRegisteration() {
  const [nameValid, setNameValid] = useState<number | null>(null);
  const [contentValid, setContentValid] = useState<number | null>(null);
  const [registBtnDisable, setRegistBtnDisable] = useState<boolean>(true);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const registBtnClass = `${style["btn-regist"]}`;
  const topBarClass = `flex flex-row items-center justify-between ${style["top-bar"]}`;
  const topBarTextClass = `font-bold ${style["top-bar-text"]}`;
  const labelClass = `font-bold ${style.label}`;

  const router = useRouter();

  const handleRegistPost = () => {
    if (nameValid !== VALID_VALUE || contentValid !== VALID_VALUE) {
      return;
    }

    setRegistBtnDisable(true);

    createPost({ name, content }).then((data) => {
      const path = `/bulletin-board/${data.id}`;
      router.push(path);
    });
  };

  const validateRegistValue = () => {
    if (nameValid === VALID_VALUE && contentValid === VALID_VALUE) {
      setRegistBtnDisable(false);
    } else {
      setRegistBtnDisable(true);
    }
  };

  const validateName = (value: string) => {
    if (!value) {
      return undefined;
    }

    const castrdValue = value.toString();

    if (castrdValue.length < MIN_NAME_LENGTH) {
      return WARN_MIN_NAME_LENGTH;
    } else if (MAX_NAME_LENGTH < castrdValue.length) {
      return WARN_MAX_NAME_LENGTH;
    } else {
      return VALID_VALUE;
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const getnameValid = (valid: number | null) => {
    setNameValid(valid);
  };

  const getNameWarn = () => {
    if (nameValid === WARN_MIN_NAME_LENGTH) {
      return <p className="text-warn">{MIN_NAME_LENGTH}자 이상 입력해주세요</p>;
    } else if (nameValid === WARN_MAX_NAME_LENGTH) {
      return (
        <p className="text-warn">{MAX_NAME_LENGTH}자 이하로 입력해주세요</p>
      );
    } else {
      return undefined;
    }
  };

  const validateContent = (value: number | null) => {
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

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const getContentValid = (valid: number | null) => {
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
  }, [nameValid, contentValid]);

  return (
    <div className={style.main}>
      <div className={style.content}>
        <div className={topBarClass}>
          <p className={topBarTextClass}>게시글 쓰기</p>
          <button
            className={registBtnClass}
            onClick={handleRegistPost}
            disabled={registBtnDisable}
          />
        </div>
        <div className={style["name-input-set"]}>
          <p className={labelClass}>*제목</p>
          <div className={style["input-frame"]}>
            {/* <Input
              validateFunc={validateName}
              onChange={handleNameChange}
              getValid={getnameValid}
              placeholder={"제목을 입력해주세요"}
            ></Input> */}
            {getNameWarn()}
          </div>
        </div>
        <div className={style["content-text-area-set"]}>
          <p className={labelClass}>*내용</p>
          <div className={style["text-area-frame"]}>
            {/* <TextArea
              validateFunc={validateContent}
              onChange={handleContentChange}
              getValid={getContentValid}
              placeholder={"내용을 입력해주세요"}
            ></TextArea> */}
            {getContentWarn()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostRegisteration;
