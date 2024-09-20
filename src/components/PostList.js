import React from "react";
import PostItem from "./PostItem";
import styles from "./PostItem.module.css";

export default function PostList({ posts }) {
  if (!Array.isArray(posts)) {
    return <div>Invalid data</div>;
  }

  if (posts.length === 0) {
    return <div>불러올 게시물이 없습니다.</div>;
  }

  return (
    <div className={styles.postList}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
