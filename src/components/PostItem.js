import React from "react";
import Image from "next/image";
import Link from "next/link"; // Link 추가
import AuthorProfile from "../../public/images/profile-image.png"; // 이미지 경로
import styles from "./PostItem.module.css";

export default function PostItem({ post }) {
  return (
    <a className={styles.postItem}>
      <div className={styles.postHeader}>
        <Link href={`/post-detail/${post.id}`}>
          <h3 className={styles.postTitle}>{post.title}</h3>
        </Link>
        <Image
          src="/images/post-Image.png"
          alt={post.title}
          className={styles.bestPostImage}
          width={72}
          height={72}
        />
      </div>
      <div className={styles.postFooter}>
        <div className={styles.postAuthorDate}>
          <Image
            src={AuthorProfile}
            alt="Profile"
            className={styles.profileImage}
            width={24}
            height={24}
          />
          <span className={styles.authorName}>{post.author}</span>
          <span className={styles.postDate}>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <span className={styles.likeCount}>💙 {post.likeCount}</span>
      </div>
    </a>
  );
}
