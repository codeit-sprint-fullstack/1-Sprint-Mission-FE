"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { setPost } from "src/lib/api-post";
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
} from "src/app/constants/post";
import { ModifyPostProps } from "src/types/post";

import style from "./post-edit.module.css";

export function ModifyPost({ postId, data }: ModifyPostProps) {
  const [newNameValid, setNewNameValid] = useState<number>(VALID_VALUE);
  const [contentValid, setContentValid] = useState<number>(VALID_VALUE);
  const [registBtnDisable, setRegistBtnDisable] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(data.name);
  const [content, setContent] = useState<string>(data.content);
  const registBtnClass = `${style["btn-regist"]}`;
  const topBarClass = `flex flex-row items-center justify-between ${style["top-bar"]}`;
  const topBarTextClass = `font-bold ${style["top-bar-text"]}`;
  const labelClass = `font-bold ${style.label}`;

  const router = useRouter();

  const handleModifyPost = () => {
    if (newNameValid !== 0 || contentValid !== 0) {
      return;
    }

    setRegistBtnDisable(false);

    setPost({ postId, name: newName, content }).then((data) => {
      const path = `/bulletin-board/${data.id}`;
      router.push(path);
    });
  };

  const validateRegistValue = () => {
    if (newNameValid === VALID_VALUE && contentValid === VALID_VALUE) {
      setRegistBtnDisable(false);
    } else {
      setRegistBtnDisable(true);
    }
  };

  const validateNewName = (value: string | null) => {
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

  const handleNewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const getnewNameValid = (valid: number) => {
    setNewNameValid(valid);
  };

  const getNewNameWarn = () => {
    if (newNameValid === WARN_MIN_NAME_LENGTH) {
      return <p className="text-warn">{MIN_NAME_LENGTH}자 이상 입력해주세요</p>;
    } else if (newNameValid === WARN_MAX_NAME_LENGTH) {
      return (
        <p className="text-warn">{MAX_NAME_LENGTH}자 이하로 입력해주세요</p>
      );
    } else {
      return undefined;
    }
  };

  const validateContent = (value: string | null) => {
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

  const getContentValid = (valid: number) => {
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
  }, [newNameValid, contentValid]);

  return (
    <div className={style.main}>
      <div className={style.content}>
        <div className={topBarClass}>
          <p className={topBarTextClass}>게시글 수정하기</p>
          <button
            className={registBtnClass}
            onClick={handleModifyPost}
            disabled={registBtnDisable}
          />
        </div>
        <div className={style["newName-input-set"]}>
          <p className={labelClass}>*제목</p>
          <div className={style["input-frame"]}>
            {/* <Input
              validateFunc={validateNewName}
              onChange={handleNewNameChange}
              getValid={getnewNameValid}
              placeholder={"제목을 입력해주세요"}
              value={newName}
            ></Input> */}
            {getNewNameWarn()}
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
              value={content}
            ></TextArea> */}
            {getContentWarn()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifyPost;
