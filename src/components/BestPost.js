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
  const formattedDate = new Date(date).toLocaleDateString();
  return (
    <div className={styles.bestPost}>
      <div className={styles.badgeContainer}>
        <Image src={bestBadge} alt="Best Badge" fill className={styles.badge} />
      </div>
      <div className={styles.postContent}>
        <h3 className="text-xl semibold">{title}</h3>
        <Image
          src={defaultImage}
          alt="Post Image"
          width={72}
          height={72}
          className={styles.postImage}
        />
      </div>
      <div className={styles.postInfo}>
        <div className={styles.infoLeft}>
          <span className="text-md regular">{nickname}</span>
          <Image
            src={emptyHeart}
            alt="Heart"
            width={16}
            height={16}
            className={styles.heart}
          />
          <span className="text-md regular">{likes}</span>
        </div>
        <span className={`${styles.date} text-md regular`}>
          {formattedDate}
        </span>
      </div>
    </div>
  );
};

export default BestPost;
