// components/Footer.js
import Image from "next/image";
import styles from "./Footer.module.css"; // 스타일 파일 추가

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* 수정: .footerContent 클래스명을 사용하여 컨텐츠 전체를 감싸는 div 추가 */}
      <div className={styles.footerContent}>
        {/* 회사명과 연도를 표시하는 부분 */}
        <div>© Codeit - 2024</div>

        {/* 수정: 정책 링크를 포함하는 div에 .policy 클래스명 추가 */}
        <div className={styles.policy}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>

        {/* 수정: 소셜 아이콘을 포함하는 div에 .socialIcons 클래스명 추가 */}
        <div className={styles.socialIcons}>
          {/* 각각의 소셜 미디어 아이콘을 이미지로 추가 */}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* 수정: 이미지 크기를 작게 조정 (24x24) */}
            <Image
              src="/ic_facebook.png"
              alt="Facebook"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/ic_twitter.png" alt="Twitter" width={20} height={16} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/ic_youtube.png" alt="YouTube" width={20} height={14} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/ic_insta.png" alt="Instagram" width={17} height={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
