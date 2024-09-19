import AuthenticationBody from "@/components/authentication/AuthenticationBody";
import AuthenticationButton from "@/components/authentication/AuthenticationButton";
import EasyLogin from "@/components/authentication/EasyLogin";
import Inputbox from "@/components/authentication/InputBox";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [value, setValue] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const postHandler = () => {}

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
        />
        <Inputbox
          mode={"signup"}
          name={"nickname"}
          value={value.nickname}
          changeHandler={changeHandler}
        />
        <Inputbox
          mode={"signup"}
          name={"password"}
          value={value.password}
          changeHandler={changeHandler}
        />
        <Inputbox
          mode={"signup"}
          name={"passwordConfirmation"}
          value={value.passwordConfirmation}
          changeHandler={changeHandler}
          checkpassword={value.password}
        />
        <AuthenticationButton mode={"signup"} postHandler={postHandler}/>
      </AuthenticationBody>
    </>
  );
}
