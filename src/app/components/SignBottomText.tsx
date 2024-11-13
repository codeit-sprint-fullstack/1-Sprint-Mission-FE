import Link from "next/link";
import classNames from "classnames";

import { SignBottomTextProps } from "src/types/components";

export default function SignBottomText({
  message,
  linkText,
  linkPath,
}: SignBottomTextProps) {
  const signBottomTextClass = classNames(
    "flex",
    "flex-row",
    "items-center",
    "justify-center",
    "gap-[0.4rem]",
    "mt-[2.4rem]"
  );
  const messageClass = classNames(
    "text-[1.5rem]",
    "text-gray-800",
    "font-medium"
  );
  const linkTextClass = classNames(
    "text-[1.5rem]",
    "font-medium",
    "text-dodger-blue",
    "underline"
  );

  return (
    <div className={signBottomTextClass}>
      <p className={messageClass}>{message}</p>
      <Link className={linkTextClass} href={linkPath}>
        {linkText}
      </Link>
    </div>
  );
}
