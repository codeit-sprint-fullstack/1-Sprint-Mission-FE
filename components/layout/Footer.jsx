import Link from "next/link";
import styles from "./Footer.module.scss";
import assets from "@/variables/images";
import { IconContainer } from "../ui/ImgContainers";

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.container}>
        <p>&copy;codeit - 2024</p>
        <ul className={styles.extras}>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
        </ul>
        <ul className={styles.icons}>
          <li>
            <Link href="https://www.facebook.com/" target="_blank">
              <IconContainer
                src={assets.icons.facebook}
                width="18px"
                alt="facebook icon"
              />
            </Link>
          </li>
          <li>
            <Link href="https://x.com/?lang=en" target="_blank">
              <IconContainer
                src={assets.icons.twitter}
                width="18px"
                alt="twitter icon"
              />
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/" target="_blank">
              <IconContainer
                src={assets.icons.youtube}
                width="18px"
                alt="youtube icon"
              />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/"
              width="18px"
              target="_blank"
            >
              <IconContainer
                src={assets.icons.instagram}
                width="18px"
                alt="instagram icon"
              />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
