import { calculateTimeAgo, formatDate } from "@/utils/formatFn";
import ProfileImg from "../ui/ProfileImg";
import styles from "./UserInfo.module.scss";

export default function UserInfo({ data, entity }) {
  const isProduct = entity === "product";
  const isComment = entity === "comment";

  const size = isComment ? "40px" : "32px";
  const classNames = isComment
    ? `${styles.UserInfo} ${styles.comment}`
    : styles.UserInfo;

  const nickName = isProduct ? data.ownerNickname : data.writer.nickname;
  const image = isProduct ? undefined : data.writer.image;

  const dateFormat = isComment ? calculateTimeAgo : formatDate;

  return (
    <div className={classNames}>
      <ProfileImg width={size} src={image} />
      <div className={styles.user}>
        <span className={styles.name}>{nickName || "총명한 판다"}</span>
        <time className={styles.date}>{dateFormat(data.createdAt)}</time>
      </div>
    </div>
  );
}
