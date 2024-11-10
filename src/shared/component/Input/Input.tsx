import classNames from "classnames";
import Image from "next/image";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  option: "default" | "password";
  visibility?: boolean;
  toggle?: () => void;
}

export default function Input({
  className,
  option,
  visibility,
  toggle,
  ...props
}: InputProps) {
  const inputClassName = classNames(
    "w-[640px] h-[56px] px-[24px] py-[16px] rounded-[12px] bg-[var(--cool-gray-100)]"
  );

  const input: { [key in InputProps["option"]]: JSX.Element } = {
    default: <input className={inputClassName} {...props}></input>,
    password: (
      <div className="relative">
        <input
          className={inputClassName}
          type={visibility ? "text" : "password"}
          {...props}
        ></input>
        {visibility ? (
          <Image
            src={"/visibility-on.svg"}
            width={24}
            height={24}
            alt="visibility"
            className="absolute right-[16px] top-[16px] cursor-pointer"
            onClick={toggle}
          />
        ) : (
          <Image
            src={"/visibility-off.svg"}
            width={24}
            height={24}
            alt="visibility"
            className="absolute right-[16px] top-[16px] cursor-pointer"
            onClick={toggle}
          />
        )}
      </div>
    ),
  };

  return input[option];
}
