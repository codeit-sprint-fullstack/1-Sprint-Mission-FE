import SignupForm from "@/features/UserAuth/SignupForm";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Image
        src={"/logo.svg"}
        width={396}
        height={132}
        alt="logo"
        className="mb-[40px]"
      />
      <SignupForm />
    </div>
  );
}
