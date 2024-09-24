import React from "react";
import Image from "next/image";
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
              <Image
                src="/images/defaultImage.svg"
                alt="defaultImage"
                width={100}
                height={100}
                layout="responsive"
              />
            </BestCardContent>
          </BestCardHeader>
          <div className={styles.BottomHug}>
            <div className={styles.authorImageHug}>
              <BestCardAuthor>{post.author_name}</BestCardAuthor>
              <div className={styles.likesHug}>
                <Image
                  src="/images/ic_heart.svg"
                  alt="heart_icon"
                  width={16}
                  height={16}
                />
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
