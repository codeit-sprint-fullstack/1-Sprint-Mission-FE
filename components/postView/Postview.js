import Image from "next/image";
import styles from "./Postview.module.css";
export default function Postview() {
  return (
    <div className={styles.Container}>
      <div className={styles.PostviewContainer}>
        <p>맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?</p>
        <Image
          className={styles.PostviewImg}
          src="ItemImg.svg"
          width={300}
          height={300}
        ></Image>
      </div>
      <div className={styles.PostviewInfo}>
        <div className={styles.Posttitle}>
          <Image src="MyImg.svg" width={24} height={24} />
          <p className={styles.MyName}>총명한 판다</p>
          <p className={styles.MyDate}>2022.01.01</p>
        </div>
        <div>
          <p>♡0000+</p>
        </div>
      </div>
    </div>
  );
}
