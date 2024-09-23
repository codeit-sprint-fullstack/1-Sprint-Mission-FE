import style from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";

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
              <Image src={'/images/ic_facebook.svg'} width={20} height={20} alt="페이스북" />
            </Link>
            <Link href="https://x.com/" target="_blank" rel="noopener noreferrer">
              <Image src={'/images/ic_twitter.svg'} width={20} height={20} alt="X(구트위터)" />
            </Link>
            <Link href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
              <Image src={'/images/ic_youtube.svg'} width={20} height={20} alt="유튜브" />
            </Link>
            <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <Image src={'/images/ic_instagram.svg'} width={20} height={20} alt="인스타그램" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}