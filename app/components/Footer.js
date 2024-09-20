import Link from "next/link";
import classNames from "classnames";
import style from "./footer.module.css";

export function Footer() {
  const footerClass = classNames(
    "flex",
    "flex-row",
    "justify-center",
    "w-full",
    "h-footer",
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
    "mt-3.2rem",
    "mx-20rem",
    "tablet:mx-2.4rem",
    "mobile:mt-mobile-footer",
    "mobile:mx-1.6rem",
    "mobile:gap-2.4rem",
    "mobile:flex-wrap-reverse"
  );
  const companyClass = classNames(
    "text-lg",
    "text-gray-400",
    "leading-20",
    "font-normal",
    "mobile:basis-full"
  );
  const linkTextsClass = classNames(
    "flex",
    "flex-row",
    "flex-nowrap",
    "gap-footer-link",
    "text-lg",
    "text-gray-400",
    "leading-20",
    "font-normal"
  );
  const linkTextClass = classNames("no-underline", "text-gray-400");
  const linkIconsClass = classNames(
    "flex",
    "flex-row",
    "flex-nowrap",
    "gap-footer-icons"
  );
  const linkIconClass = classNames(
    "w-footer-icon",
    "h-footer-icon",
    "bg-cover",
    "hover:opacity-75"
  );
  const facebookIconClass = classNames(linkIconClass, style["facebook-icon"]);
  const xIconClass = classNames(linkIconClass, style["x-icon"]);
  const youtubeIconClass = classNames(linkIconClass, style["youtube-icon"]);
  const instagramIconClass = classNames(linkIconClass, style["instagram-icon"]);

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
          >
            <span>
              <img className={facebookIconClass} alt="페이스북 링크" />
            </span>
          </Link>
          <Link href="https://x.com/" target="_blank" rel="noreferrer">
            <span>
              <img className={xIconClass} alt="엑스 링크" />
            </span>
          </Link>
          <Link
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <img className={youtubeIconClass} alt="유튜브 링크" />
            </span>
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <img className={instagramIconClass} alt="인스타그램 링크" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
