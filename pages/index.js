import styles from "@styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={`${styles.homeTitle} text-xl bold`}>Home Page 입니다</h1>
    </div>
  );
}
