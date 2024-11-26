import Link from "next/link";
import Image from "next/image";

import classNames from "classnames";

export function LogoLinkW396() {
  const listClass = classNames(
    "w-[39.6rem]",
    "h-[13.2rem]",
    "mb-[4rem]",
    "mx-auto",
    "relative",
    "mo:w-[19.8rem]",
    "mo:h-[6.6rem]",
    "mo:mb-[2.4rem]"
  );

  return (
    <Link className={listClass} href="/">
      <Image
        src="/buttons/btn_logo.svg"
        alt="로고 링크"
        fill
        style={{ objectFit: "cover" }}
        priority={false}
      />
    </Link>
  );
}
