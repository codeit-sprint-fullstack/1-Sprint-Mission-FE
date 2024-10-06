import AuthenticationBody from "@/components/authentication/AuthenticationBody";
import AuthenticationButton from "@/components/authentication/AuthenticationButton";
import Inputbox from "@/components/authentication/InputBox";
import Head from "next/head";
import { useEffect, useState } from "react";
import { signupPost, checkTokenValidity } from "@/lib/axiosCodeit";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [value, setValue] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [readyOk, setReadyOk] = useState(false);

  useEffect(() => {
    // 서버에서 검증 후 이동하려고 했으나 계속 CORS Error가 떠 이렇게 했습니다.
    const token = localStorage.getItem("accessToken");
    // if (token) {
    //   // 토큰 검증 요청
    //   const validateToken = async () => {
    //     const isValid = await checkTokenValidity(token); // 서버에 검증 요청
    //     if (isValid) {
    //       router.push("/folder");
    //     }
    //   };

    //   validateToken();
    // }
    if (token && token.trim() !== "") {
      router.push("/folder");
    }
  }, []);

  const changeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const readyOkHandler = () => {
    if (
      value.email !== "" &&
      value.nickname !== "" &&
      value.password &&
      value.password.length > 7 &&
      value.password === value.passwordConfirmation
    ) {
      setReadyOk(true);
    } else {
      setReadyOk(false);
    }
  };

  const postHandler = async () => {
    const res = await signupPost(value);
    if (res) {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      router.push("/items");
    }
  };

  const enterKeyHandler = (e) => {
    if (readyOk && e.key === "Enter") {
      postHandler();
    }
  };

  return (
    <>
      <Head>
        <title>회원가입 | 판다마켓</title>
      </Head>
      <AuthenticationBody mode={"signup"}>
        <Inputbox
          mode={"signup"}
          name={"email"}
          value={value.email}
          changeHandler={changeHandler}
          readyOkHandler={readyOkHandler}
          enterKeyHandler={enterKeyHandler}
        />
        <Inputbox
          mode={"signup"}
          name={"nickname"}
          value={value.nickname}
          changeHandler={changeHandler}
          readyOkHandler={readyOkHandler}
          enterKeyHandler={enterKeyHandler}
        />
        <Inputbox
          mode={"signup"}
          name={"password"}
          value={value.password}
          changeHandler={changeHandler}
          readyOkHandler={readyOkHandler}
          enterKeyHandler={enterKeyHandler}
        />
        <Inputbox
          mode={"signup"}
          name={"passwordConfirmation"}
          value={value.passwordConfirmation}
          changeHandler={changeHandler}
          readyOkHandler={readyOkHandler}
          enterKeyHandler={enterKeyHandler}
          checkpassword={value.password}
        />
        <AuthenticationButton
          mode={"signup"}
          postHandler={postHandler}
          readyOk={readyOk}
        />
      </AuthenticationBody>
    </>
  );
}
