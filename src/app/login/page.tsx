import LoginForm from "@/features/UserAuth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Image
        src={"/logo.svg"}
        width={396}
        height={132}
        alt="logo"
        className="mb-[40px]"
      />
      <LoginForm />
    </div>
  );
}
