import style from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={style.bottom_frame}>
      <div className={style.bottom_box}>
        <div className={style.mobile}>©codeit - 2024</div>
        <div className={style.link_box}>
          <div className={style.qna}>
            <Link className={style.qna_word} href="/privacy/">
              Privacy Policy
            </Link>
            <Link className={style.qna_word} href="/faq/">
              FAQ
            </Link>
          </div>
          <div className={style.icon}>
            <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src={'/images/ic_facebook.svg'} alt="페이스북" />
            </Link>
            <Link href="https://x.com/" target="_blank" rel="noopener noreferrer">
              <img src={'/images/ic_twitter.svg'} alt="X(구트위터)" />
            </Link>
            <Link href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
              <img src={'/images/ic_youtube.svg'} alt="유튜브" />
            </Link>
            <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src={'/images/ic_instagram.svg'} alt="인스타그램" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}