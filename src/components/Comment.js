import styles from "@styles/Comment.module.css";
import KebabDropdown from "./KebabDropdown";
import Image from "next/image";

import profileImage from "@images/ic_profile.svg";

const Comment = () => {
  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <span>Comment</span>
        <KebabDropdown />
      </div>
      <div className={styles.commentInfo}>
        <Image src={profileImage} alt="profile image" width={32} height={32} />
        <div>
          <span>Nick Name</span>
          <span>time</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
