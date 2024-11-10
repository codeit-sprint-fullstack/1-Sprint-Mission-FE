"use client";
import Button from "@/shared/component/button/button";
import Input from "@/shared/component/Input/Input";
import { useState } from "react";

export default function SignupForm() {
  const [visible, setVisible] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  const toggle = (field: "password" | "confirmPassword") =>
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));

  return (
    <div className="flex flex-col space-y-[24px]">
      <div className="space-y-[16px]">
        <div className="text-[18px] font-bold">이메일</div>
        <Input option="default" placeholder="이메일을 입력해주세요" />
      </div>
      <div className="space-y-[16px]">
        <div className="text-[18px] font-bold">닉네임</div>
        <Input option="default" placeholder="닉네임을 입력해주세요" />
      </div>
      <div className="space-y-[16px]">
        <div className="text-[18px] font-bold">비밀번호</div>
        <Input
          option="password"
          visibility={visible.password}
          toggle={() => toggle("password")}
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <div className="space-y-[16px]">
        <div className="text-[18px] font-bold">비밀번호 확인</div>
        <Input
          option="password"
          visibility={visible.confirmPassword}
          toggle={() => toggle("confirmPassword")}
          placeholder="비밀번호를 다시 한 번 입력해주세요"
        />
      </div>
      <Button
        buttonText="로그인"
        styles={{
          width: "640px",
          height: "56px",
          rounded: "40px",
          background: "#3692ff",
          color: "white",
          text: "20px",
          font: "semibold",
        }}
      />
    </div>
  );
}
