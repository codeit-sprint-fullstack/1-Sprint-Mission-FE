import AuthenticationBody from "@/components/authentication/AuthenticationBody";
import AuthenticationButton from "@/components/authentication/AuthenticationButton";
import Inputbox from "@/components/authentication/InputBox";
import Head from "next/head";
import { useState } from "react";

export default function Signin() {
  const [value, setValue] = useState({ email: "", password: "" });

  // value 값 일치 함수
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const postHandler = () => {};

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
        />
        <Inputbox
          mode={"login"}
          name={"password"}
          value={value.password}
          changeHandler={changeHandler}
        />
        <AuthenticationButton mode={"login"} postHandler={postHandler} />
      </AuthenticationBody>
    </>
  );
}
