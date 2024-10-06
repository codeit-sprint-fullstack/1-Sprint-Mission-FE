import { useEffect, useState } from "react";
import Image from "next/image";
import style from "./InputBox.module.css";

export default function Inputbox({
  mode, //  사용 페이지(login, signup)
  name, // input 종류
  value, // input 값
  changeHandler, // value 값 일치 함수
  readyOkHandler, // 버튼색 변경 함수
  enterKeyHandler, // Enter를 눌렀을때 서버 요청
  checkpassword, // 비밀번호 확인(회원가입 쪽에서 사용)
  loginError, // 로그인에서 에러 발생시 (로그인에서만 사용)
  setLoginError,
}) {
  const [lavelName, setLavelName] = useState("");
  const [placeholder, setPlaceHolder] = useState("");
  const [inputType, setInputType] = useState("text");
  const [showErrorMasage, setShowEorrorMasage] = useState(false);
  const [errorMasage, setErrorMasage] = useState("");
  const [inputMargin, setInputMargin] = useState(style.margin24);
  const [eyesIcon, setEyesIcon] = useState("/images/ic_slash_eyes.svg");
  const [showEyesIcon, setShowEyesIcon] = useState(false);

  useEffect(() => {
    // input 종류에 따른 placeholder 변경
    if (name === "email") {
      setLavelName("이메일");
      setPlaceHolder("이메일을 입력해주세요");
    } else if (name === "nickname") {
      setLavelName("닉네임");
      setPlaceHolder("닉네임을 입력해주세요");
    } else if (name === "password") {
      setLavelName("비밀번호");
      setPlaceHolder("비밀번호를 입력해주세요");
      setInputType("password");
      setShowEyesIcon(true);
    } else if (name === "passwordConfirmation") {
      setLavelName("비밀번호 확인");
      setPlaceHolder("비밀번호를 다시 한 번 입력해주세요");
      setInputType("password");
      setShowEyesIcon(true);
    }

    // 사용 페이지에 따른 error 메세지 변경
    if (mode === "login") {
      if (name === "email") {
        setErrorMasage("이메일을 확인해 주세요.");
      } else if (name === "password") {
        setErrorMasage("비밀번호를 확인해 주세요");
      }
    } else if (mode === "signup") {
      if (name === "email") {
        setErrorMasage("잘못된 이메일입니다.");
      } else if (name === "nickname") {
        setErrorMasage("닉네임을 입력해주세요");
      } else if (name === "password") {
        setErrorMasage("비밀번호를 8자 이상 입력해주세요");
      } else if (name === "passwordConfirmation") {
        setErrorMasage("비밀번호가 일치하지 않습니다");
      }
    }

    if (loginError) {
      setShowEorrorMasage(true);
      setInputMargin(style.margin8);
    } 
  }, [name, mode, loginError]);

  // 회원가입의 input 값에 따른 에러메세지 출력
  const errorCheckHandler = () => {
    if (mode === "signup") {
      if (name === "email") {
        const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        if (!email_regex.test(value)) {
          setShowEorrorMasage(true);
          setInputMargin(style.margin8);
        } else {
          setShowEorrorMasage(false);
          setInputMargin(style.margin24);
        }
      } else if (name === "nickname") {
        if (value === "") {
          setShowEorrorMasage(true);
          setInputMargin(style.margin8);
        } else {
          setShowEorrorMasage(false);
          setInputMargin(style.margin24);
        }
      } else if (name === "password") {
        if (value.length < 8) {
          setShowEorrorMasage(true);
          setInputMargin(style.margin8);
        } else {
          setShowEorrorMasage(false);
          setInputMargin(style.margin24);
        }
      } else if (name === "passwordConfirmation") {
        if (value !== checkpassword) {
          setShowEorrorMasage(true);
          setInputMargin(style.margin8);
        } else {
          setShowEorrorMasage(false);
          setInputMargin(style.margin24);
        }
      }
    } else if (mode === "login") {
      setShowEorrorMasage(false);
      setInputMargin(style.margin24);
      setLoginError(false);
    }
    readyOkHandler();
  };

  const eyesChangeHadler = () => {
    if (inputType === "text") {
      setInputType("password");
      setEyesIcon("/images/ic_slash_eyes.svg");
    } else if (inputType === "password") {
      setInputType("text");
      setEyesIcon("/images/ic_eyes.svg");
    }
  };

  return (
    <div className={style.contaner}>
      <lavel className={style.InputBoxLavel}>{lavelName}</lavel>
      <input
        className={`${style.InputboxInput} ${inputMargin}`}
        name={name}
        value={value}
        onChange={changeHandler}
        onKeyUp={errorCheckHandler}
        onKeyDown={enterKeyHandler}
        placeholder={placeholder}
        type={inputType}
      />
      {showErrorMasage && (
        <div className={style.errorMasage}>{errorMasage}</div>
      )}
      {showEyesIcon && (
        <Image
          className={style.eyesIcon}
          src={eyesIcon}
          width={24}
          height={24}
          alt="눈 아이콘"
          onClick={eyesChangeHadler}
        />
      )}
    </div>
  );
}
