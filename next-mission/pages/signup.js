import EasyLogin from "@/components/EasyLogin";
import Inputbox from "@/components/InputBox";
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
  return (
    <>
      <Image
        src={"/images/pandaLogo.svg"}
        width={396}
        height={132}
        alt="판다 로고"
      />
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
      <button>회원가입</button>
      <EasyLogin />
      <div>
      이미 회원이신가요?
      <Link href='/login'>로그인</Link>
      </div>
    </>
  );
}
