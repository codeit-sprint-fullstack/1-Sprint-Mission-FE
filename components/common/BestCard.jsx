import React from "react";
import styles from "./BestCard.module.css";
import Image from "next/image";

export const BestCard = ({ className, ...props }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardTextHug}>
        <Image
          src="/images/ic_medal.svg"
          alt="Profile picture"
          width={16}
          height={16}
        />
        BEST
      </div>
      <div {...props}></div>
    </div>
  );
};

export const BestCardHeader = ({ className, ...props }) => {
  return <div className={`${styles.cardHeader} ${className}`} {...props} />;
};

export const BestCardTitle = ({ className, ...props }) => {
  return <h3 className={`${styles.cardTitle} ${className}`} {...props} />;
};

export const BestCardContent = ({ className, ...props }) => {
  return <div className={`${styles.cardContent} ${className}`} {...props} />;
};

export const BestCardAuthor = ({ className, ...props }) => {
  return <div className={`${styles.cardAuthor} ${className}`} {...props} />;
};
