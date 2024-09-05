import Image from "next/image";
import styles from "@/components/Header/Header.module.css";
export default function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderImgContainer}>
        <Image src="logo-img.svg" alt="logo" fill={true} />
      </div>
      <div className={styles.HeaderMenu}>
        <p>자유 게시판</p>
        <p>중고마켓</p>
      </div>
      <button className={styles.HeaderBtn}>로그인</button>
    </div>
  );
}
