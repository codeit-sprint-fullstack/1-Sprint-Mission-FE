import Image from 'next/image';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <>
      <div className={styles.FooterContainer}>
        <div className={styles.FooterContent}>
          <p className={styles.FooterTitle}>@codeit - 2024</p>
          <div className={styles.FooterMenu}>
            <p>Privacy Policy</p>
            <p>FAQ</p>
          </div>
          <div className={styles.FooterIcon}>
            <Image
              src="/facebook.svg"
              alt="Facebook logo"
              width={20}
              height={20}
            />
            <Image
              src="/twitter.svg"
              alt="Twitter logo"
              width={20}
              height={20}
            />
            <Image
              src="/youtube.svg"
              alt="YouTube logo"
              width={20}
              height={20}
            />
            <Image
              src="/instagram.svg"
              alt="Instagram logo"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
