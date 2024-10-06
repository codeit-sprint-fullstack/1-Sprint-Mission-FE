import styles from '@shared/components/Forms/FormFooter.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function FormFooter({ content, linkContent, path }) {
  return (
    <>
      <div className={styles['simple-login-container']}>
        <div className={styles['simple-login-content']}>간편 로그인하기</div>
        <div className={styles['image-container']}>
          <div className={styles['sns-logo']}>
            <Image src={'/google.svg'} fill />
          </div>
          <div className={styles['sns-logo']}>
            <Image src={'/kakao.svg'} fill />
          </div>
        </div>
      </div>
      <div className={styles['footer-content']}>
        {content} <Link href={path}>{linkContent}</Link>
      </div>
    </>
  );
}
