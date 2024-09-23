import { formatDate } from "@/utils/formatFn";
import ProfileImg from "../ui/ProfileImg";
import styles from "./UserInfo.module.scss";

export default function UserInfo({ date, user, variant }) {
  const size = variant === "comment" ? "40px" : "32px";
  const createdAt = !date ? user.createdAt : date;
  const classNames =
    variant === "comment"
      ? `${styles.UserInfo} ${styles.comment}`
      : styles.UserInfo;

  return (
    <div className={classNames}>
      <ProfileImg width={size} src={user?.image} />
      <div className={styles.user}>
        <span className={styles.name}>{user?.nickname || "총명한 판다"}</span>
        <time className={styles.date}>{formatDate(createdAt)}</time>
      </div>
    </div>
  );
}
