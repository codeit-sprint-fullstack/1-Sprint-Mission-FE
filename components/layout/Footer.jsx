import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";
import faceBookIcon from "../../public/assets/icons/ic_facebook.svg";
import twitterIcon from "../../public/assets/icons/ic_twitter.svg";
import youtubeIcon from "../../public/assets/icons/ic_youtube.svg";
import instagramIcon from "../../public/assets/icons/ic_instagram.svg";

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.container}>
        <p>&copy;codeit - 2024</p>
        <ul className={styles.extras}>
          <li>
            <Link href="./privacy">Privacy Policy</Link>
          </li>
          <li>
            <a href="./faq">FAQ</a>
          </li>
        </ul>

        <ul className={styles.icons}>
          <li>
            <Link href="https://www.facebook.com/" target="_blank">
              <Image src={faceBookIcon} alt="facebook icon" />
            </Link>
          </li>
          <li>
            <Link href="https://x.com/?lang=en" target="_blank">
              <Image src={twitterIcon} alt="twitter icon" />
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/" target="_blank">
              <Image src={youtubeIcon} alt="youtube icon" />
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/" target="_blank">
              <Image src={instagramIcon} alt="instagram icon" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
