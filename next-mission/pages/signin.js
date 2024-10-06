import AuthenticationBody from "@/components/authentication/AuthenticationBody";
import AuthenticationButton from "@/components/authentication/AuthenticationButton";
import Inputbox from "@/components/authentication/InputBox";
import { singinPost, checkTokenValidity } from "@/lib/axiosCodeit";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Signin() {
  const router = useRouter();
  const [value, setValue] = useState({ email: "", password: "" });
  const [readyOk, setReadyOk] = useState(false);
  const [loginError, setLoginError] = useState(false);

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

  // value 값 일치 함수
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const readyOkHandler = () => {
    if (value.email !== "" && value.password && value.password.length > 7) {
      setReadyOk(true);
    } else {
      setReadyOk(false);
    }
  };

  const postHandler = async () => {
    try {
      const res = await singinPost(value);
      if (res) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        router.push("/items");
      }
    } catch (e) {
      setLoginError(true);
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
        <title>로그인 | 판다마켓</title>
      </Head>
      <AuthenticationBody mode={"login"}>
        <Inputbox
          mode={"login"}
          name={"email"}
          value={value.email}
          changeHandler={changeHandler}
          readyOkHandler={readyOkHandler}
          enterKeyHandler={enterKeyHandler}
          loginError={loginError}
          setLoginError={setLoginError}
        />
        <Inputbox
          mode={"login"}
          name={"password"}
          value={value.password}
          changeHandler={changeHandler}
          readyOkHandler={readyOkHandler}
          enterKeyHandler={enterKeyHandler}
          loginError={loginError}
          setLoginError={setLoginError}
        />
        <AuthenticationButton
          mode={"login"}
          postHandler={postHandler}
          readyOk={readyOk}
        />
      </AuthenticationBody>
    </>
  );
}
