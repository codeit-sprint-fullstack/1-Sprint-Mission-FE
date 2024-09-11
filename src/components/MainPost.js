import styles from "@styles/MainPost.module.css";
import Image from "next/image";

import defaultImage from "@images/panda_image.png";
import defaultProfileImage from "@images/ic_profile.svg";
import emptyHeart from "@images/favoriteEmptyHeart-small.png";

const MainPost = ({
  title = "제목을 입력하세요",
  date = "2024.09.09",
  likes = 9999,
  nickname = "총명한 판다",
}) => {
  const formattedDate = new Date(date).toLocaleDateString();
  return (
    <div className={styles.mainPost}>
      <div className={styles.postLeft}>
        <h3 className={`${styles.title} text-xl semibold`}>{title}</h3>
        <div className={styles.postInfo}>
          <Image
            src={defaultProfileImage}
            alt="profile image"
            width={24}
            height={24}
          />
          <span className="text-md regular">{nickname}</span>
          <span className={`${styles.date} text-md regular`}>
            {formattedDate}
          </span>
        </div>
      </div>
      <div className={styles.postRight}>
        <Image
          src={defaultImage}
          alt="default image"
          width={72}
          height={72}
          className={styles.postImage}
        />
        <div className={styles.likes}>
          <Image src={emptyHeart} alt="Heart" width={24} height={24} />
          <span className="text-md regular">{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default MainPost;
