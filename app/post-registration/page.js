"use client";

import { useState } from "react";

import Input from "../components/input";

import style from "./post-registration.module.css";

const MIN_TITLE_LENGTH = 2;
const WARN_MIN_TITLE_LENGTH = 402;
const MAX_TITLE_LENGHT = 30;
const WARN_MAX_TITLE_LENGHT = 430;

const VALID_VALUE = 0;

export function postRegistration() {
  const [titleValid, setTitleValid] = useState();
  const topBarClass = `flex flex-row`;

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

  const handleTitleChange = (e) => {};

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

  return (
    <div className={style.main}>
      <div className={null}>
        <div className={topBarClass}>
          <p>게사판 쓰기</p>
          <button>등록</button>
        </div>
        <div className={null}>
          <p>*제목</p>
          <div className={null}>
            <Input
              validateFunc={titleValidate}
              onChange={handleTitleChange}
              getValid={getTitleValid}
              placeholder={"제목을 입력해주세요"}
            ></Input>
          </div>
          {getTitleWarn()}
        </div>
      </div>
    </div>
  );
}

export default postRegistration;
