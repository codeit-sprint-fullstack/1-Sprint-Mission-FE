import styles from "@styles/Comment.module.css";
import KebabDropdown from "./KebabDropdown";
import Image from "next/image";

import profileImage from "@images/ic_profile.svg";

const Comment = () => {
  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <span className={`${styles.commentContent} text-md regular`}>
          Comment
        </span>
        <KebabDropdown />
      </div>
      <div className={styles.commentInfo}>
        <Image src={profileImage} alt="profile image" width={32} height={32} />
        <div className={styles.infoContent}>
          <span className={`${styles.commentNickname} text-xs regular`}>
            Nick Name
          </span>
          <span className={`${styles.commentTime} text-xs regular`}>time</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
