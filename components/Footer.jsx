import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import facebookLogo from "../public/images/ic_facebook.svg";
import youtubeLogo from "../public/images/ic_youtube.svg";
import twitterLogo from "../public/images/ic_twitter.svg";
import instagramLogo from "../public/images/ic_instagram.svg";

const COMPANY_NAME = "codeit";
const CURRENT_YEAR = new Date().getFullYear();

const FOOTER_LINKS = [
  { href: "/privacyPolicy", text: "Privacy Policy" },
  { href: "/FAQ", text: "FAQ" },
];

const MEDIA_LINKS = [
  { href: "https://facebook.com", logo: facebookLogo, name: "Facebook" },
  { href: "https://twitter.com", logo: twitterLogo, name: "Twitter" },
  { href: "https://youtube.com", logo: youtubeLogo, name: "YouTube" },
  { href: "https://instagram.com", logo: instagramLogo, name: "Instagram" },
];

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerInnerWrapper}>
        <div className={styles.footerCompanyText}>
          ©{COMPANY_NAME} - {CURRENT_YEAR}
        </div>
        <div className={styles.footerInfoHug}>
          {FOOTER_LINKS.map(({ href, text }) => (
            <Link key={href} href={href} className={styles.footerInfoText}>
              {text}
            </Link>
          ))}
        </div>
        <div className={styles.footerImageHug}>
          {MEDIA_LINKS.map(({ href, logo, name }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
            >
              <Image src={logo} alt={`${name} logo`} width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
