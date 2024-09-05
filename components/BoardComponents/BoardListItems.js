import styles from "./BoardListItems.module.css";
import Image from "next/image";
import productImg from "@/images/product.png";
import profile from "@/images/ic_profile.png";

export default function BoardListItems() {
  return (
    <>
      <div className={styles.boardListContainer}>
        <div className={styles.boardList}>
          <div className={styles.titleContainer}>
            <p className={styles.title}>
              맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
            </p>
            <div className={styles.productImgContainer}>
              <Image
                src={productImg}
                alt="product"
                className={styles.productImg}
              />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.infoContainer}>
              <Image
                src={profile}
                alt="profile"
                className={styles.profileImg}
              />
              <p className={styles.user}>총명한 판다</p>
              <p className={styles.date}>2024. 04. 16</p>
            </div>
            <p className={styles.like}>♡ 9999+</p>
          </div>
        </div>
      </div>
    </>
  );
}
