"use client";
import { Button } from "@/shared/component/button/Button";
import Input from "@/shared/component/Input/Input";
import { useState } from "react";

export default function LoginForm() {
  const [visible, setVisible] = useState<boolean>(false);

  const toggle = () => setVisible(!visible);

  return (
    <div className="flex flex-col space-y-[24px]">
      <div className="space-y-[16px]">
        <div className="text-[18px] font-bold">이메일</div>
        <Input option="default" placeholder="이메일을 입력해주세요" />
      </div>
      <div className="space-y-[16px]">
        <div className="text-[18px] font-bold">비밀번호</div>
        <Input
          option="password"
          visibility={visible}
          toggle={toggle}
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <Button variant="primary" size="lg" fullWidth>
        로그인
      </Button>
    </div>
  );
}
