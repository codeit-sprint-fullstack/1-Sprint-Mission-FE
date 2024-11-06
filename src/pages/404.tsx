import Link from "next/link";
import styles from "../styles/404.module.css";
import { ROUTES } from "@/utils/rotues";
export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 Not Found</h1>
      <Link href={ROUTES.HOME}>
        <p className={styles.link}>Home</p>
      </Link>
    </div>
  );
}
