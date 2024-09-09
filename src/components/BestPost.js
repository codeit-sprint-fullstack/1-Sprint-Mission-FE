import React from "react";
import Image from "next/image";
import styles from "@styles/BestPost.module.css";

import bestBadge from "@images/img_badge.svg";
import emptyHeart from "@images/favoriteEmptyHeart-small.png";
import defaultImage from "@images/panda_image.png";

const BestPost = ({
  title = "제목을 입력하세요",
  date = "2024.09.09",
  likes = 9999,
  nickname = "총명한 판다",
}) => {
  return (
    <div className={styles.bestPost}>
      <div className={styles.badgeContainer}>
        <Image src={bestBadge} alt="Best Badge" fill className={styles.badge} />
      </div>
      <h3>{title}</h3>
      <div className={styles.postInfo}>
        <span>{date}</span>
        <div className={styles.likes}>
          <Image
            src={emptyHeart}
            alt="Heart"
            width={16}
            height={16}
            className={styles.heart}
          />
          <span>{likes}</span>
        </div>
      </div>
      <Image src={defaultImage} alt="Post Image" width={72} height={72} />
      <div className={styles.author}>
        <span>작성자: {nickname}</span>
      </div>
    </div>
  );
};

export default BestPost;
