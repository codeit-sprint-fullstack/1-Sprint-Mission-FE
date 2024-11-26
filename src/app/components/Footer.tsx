import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

export function Footer() {
  const footerClass = classNames(
    "flex",
    "flex-row",
    "justify-center",
    "w-full",
    "h-[16rem]",
    "bg-gray-900",
    "mt-0",
    "my-auto"
  );
  const blockClass = classNames(
    "flex",
    "flex-row",
    "justify-between",
    "w-full",
    "h-2rem",
    "mt-[3.2rem]",
    "mx-[20rem]",
    "ta:mx-[2.4rem]",
    "mo:mt-[7.6rem]",
    "mo:mx-[1.6rem]",
    "mo:gap-[2.4rem]",
    "mo:flex-wrap-reverse"
  );
  const companyClass = classNames(
    "text-lg",
    "text-gray-400",
    "leading-[2rem]",
    "font-normal",
    "mo:basis-full"
  );
  const linkTextsClass = classNames(
    "flex",
    "flex-row",
    "flex-nowrap",
    "gap-[3rem]",
    "text-lg",
    "text-gray-400",
    "leading-2rem",
    "font-normal"
  );
  const linkTextClass = classNames("no-underline", "text-gray-400");
  const linkIconsClass = classNames(
    "flex",
    "flex-row",
    "flex-nowrap",
    "gap-[1.2rem]"
  );
  const linkIconFrameClass = classNames(
    "w-[2rem]",
    "h-[2rem]",
    "bg-cover",
    "hover:opacity-75",
    "relative"
  );

  return (
    <div className={footerClass}>
      <div className={blockClass}>
        <div className={companyClass}>©codeit - 2024</div>
        <div className={linkTextsClass}>
          <Link href="/privacy" target="_self" className={linkTextClass}>
            Privacy Policy
          </Link>
          <Link href="/faq" target="_self" className={linkTextClass}>
            FAQ
          </Link>
        </div>
        <div className={linkIconsClass}>
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            className={linkIconFrameClass}
          >
            <Image
              src="/icons/ic_facebook.svg"
              alt="페이스북 링크"
              fill
              style={{ objectFit: "cover" }}
            />
          </Link>
          <Link
            href="https://x.com/"
            target="_blank"
            rel="noreferrer"
            className={linkIconFrameClass}
          >
            <Image
              src="/icons/ic_twitter.svg"
              alt="엑스 링크"
              fill
              style={{ objectFit: "cover" }}
            />
          </Link>
          <Link
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
            className={linkIconFrameClass}
          >
            <Image
              src="/icons/ic_youtube.svg"
              alt="유튜브 링크"
              fill
              style={{ objectFit: "cover" }}
            />
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className={linkIconFrameClass}
          >
            <Image
              src="/icons/ic_instagram.svg"
              alt="인스타그램 링크"
              fill
              style={{ objectFit: "cover" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
