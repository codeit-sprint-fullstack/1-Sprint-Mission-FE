import React from "react";
import { formatDate } from "@/utils/dateUtils";
import {
  BestCard,
  BestCardContent,
  BestCardHeader,
  BestCardTitle,
  BestCardAuthor,
} from "@/components/common/BestCard";
import styles from "@/pages/community/index.module.css";

const BestPosts = ({ posts }) => (
  <div>
    <h2 className={styles.bestPostTitle}>베스트 게시글</h2>
    <div className={styles.bestPostContainer}>
      {posts.map((post) => (
        <BestCard key={post.id}>
          <BestCardHeader>
            <BestCardTitle>{post.title}</BestCardTitle>
            <BestCardContent>
              <img src="/images/defaultImage.svg" alt="defaultImage" />
            </BestCardContent>
          </BestCardHeader>
          <div className={styles.BottomHug}>
            <div className={styles.authorImageHug}>
              <BestCardAuthor>{post.author_name}</BestCardAuthor>
              <div className={styles.likesHug}>
                <img src="/images/ic_heart.svg" alt="heart_icon" />
                9999+
              </div>
            </div>
            <div className={styles.bestPostDate}>
              {formatDate(post.created_at)}
            </div>
          </div>
        </BestCard>
      ))}
    </div>
  </div>
);

export default BestPosts;
