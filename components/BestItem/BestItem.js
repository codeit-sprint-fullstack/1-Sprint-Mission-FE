import styles from "@/components/BestItem/BestItem.module.css";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <div className={styles.GridItem}>
        <div className={styles.BestItem}>
          <div className={styles.BestItemImg}>
            <Image src="bestItem.svg" fill={true} />
          </div>
          <p className={styles.BestItemTitle}>Best</p>
        </div>
        <div className={styles.BestItemContent}>
          <p className={styles.BestItemContentTitle}>
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요 ?
          </p>
          <div className={styles.BestImg}>
            <Image src="ItemImg.svg" fill={true} alt="logo" />
          </div>
        </div>
        <div className={styles.BestItemInfo}>
          <p>Name</p>
          <p>♡0000+</p>
          <p className={styles.BestItemDate}>2022.01.01</p>
        </div>
      </div>
    </>
  );
}
