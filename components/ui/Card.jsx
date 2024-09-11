import React from "react";
import styles from "./Card.module.css";

export const Card = ({ className, ...props }) => {
  return <div className={`${styles.card} ${className}`} {...props} />;
};

export const CardHeader = ({ className, ...props }) => {
  return <div className={`${styles.cardHeader} ${className}`} {...props} />;
};

export const CardTitle = ({ className, ...props }) => {
  return <h3 className={`${styles.cardTitle} ${className}`} {...props} />;
};

export const CardContent = ({ className, ...props }) => {
  return <div className={`${styles.cardContent} ${className}`} {...props} />;
};

export const CardAuthor = ({ className, ...props }) => {
  return <div className={`${styles.cardContent} ${className}`} {...props} />;
};
