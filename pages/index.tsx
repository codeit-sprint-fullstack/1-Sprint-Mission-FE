import Image from 'next/image';
import { postProduct } from './api/products';
import styles from '../styles/index.module.css';
import { useRouter } from 'next/router';
export default function Main() {
  const router = useRouter();
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.mainLogo}>
          <div className={styles.logoDiv}>
            <div>
              <p className={styles.logoTitle}>
                일상의 모든 물건을 거래해보세요
              </p>
              <button
                className={styles.logoBtn}
                onClick={() => router.push('/market')}
              >
                구경하러 가기
              </button>
            </div>
            <div>
              <Image
                src="/logoTop.svg"
                alt="logo"
                width={746}
                height={340}
              ></Image>
            </div>
          </div>
        </div>
        <div className={styles.logoMiddle}>
          <Image
            src="/logoMiddle1.svg"
            alt="logo"
            width={746}
            height={340}
          ></Image>
          <Image
            src="/logoMiddle2.svg"
            alt="logo"
            width={746}
            height={340}
          ></Image>
          <Image
            src="/logoMiddle3.svg"
            alt="logo"
            width={746}
            height={340}
          ></Image>
        </div>
        <div className={styles.logoBottom}>
          <div className={styles.logoDiv}>
            <div>
              <p className={styles.logoBottomTitle}>믿을 수 있는</p>
              <p className={styles.logoBottomTitle}>판다마켓 중고 거래</p>
            </div>
            <div>
              <Image
                src="/logoBottom.svg"
                alt="logo"
                width={746}
                height={340}
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
