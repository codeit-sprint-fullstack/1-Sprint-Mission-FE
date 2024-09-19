import EasyLogin from "@/components/EasyLogin";
import Inputbox from "@/components/InputBox";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [value, setValue] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <>
      <Head>
        <title>로그인 | 판다마켓</title>
      </Head>
      <Link href="/">
        <Image
          src={"/images/pandaLogo.svg"}
          width={396}
          alt="판다 로고"
          height={132}
        />
      </Link>
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
      <button>로그인</button>
      <EasyLogin />
      <div>
        판다마켓이 처음이신가요?
        <Link href="/signup">회원가입</Link>
      </div>
    </>
  );
}
