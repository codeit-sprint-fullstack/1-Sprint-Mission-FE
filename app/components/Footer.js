import Link from "next/link";
import style from "@/app/components/footer.module.css";

export function Footer() {
  const companyClass = `Text-lg Regular ${style["text-extra"]} ${style["text-extra--mobile"]}`;
  const textExtraClass = `Text-lg Regular ${style["text-extra"]} ${style["link-texts"]}`;

  return (
    <div className={style.footer}>
      <div className={style["block"]}>
        <div className={companyClass}>©codeit - 2024</div>
        <div className={textExtraClass}>
          <Link href="/privacy" target="_self" className={style["link-text"]}>
            Privacy Policy
          </Link>
          <Link href="/faq" target="_self" className={style["link-text"]}>
            FAQ
          </Link>
        </div>
        <div className={`${style["link-icons"]}`}>
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <img
                className={`${style["link-icon"]} ${style["facebook-icon"]}`}
                alt="페이스북 링크"
              />
            </span>
          </Link>
          <Link href="https://x.com/" target="_blank" rel="noreferrer">
            <span>
              <img
                className={`${style["link-icon"]} ${style["twitter-icon"]}`}
                alt="엑스 링크"
              />
            </span>
          </Link>
          <Link
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <img
                className={`${style["link-icon"]} ${style["youtube-icon"]}`}
                alt="유튜브 링크"
              />
            </span>
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <img
                className={`${style["link-icon"]} ${style["instagram-icon"]}`}
                alt="인스타그램 링크"
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
