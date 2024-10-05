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

const Bestarticles = ({ articles }) => {
  if (!articles || !Array.isArray(articles) || articles.length === 0) {
    return <div>베스트 게시글이 없습니다.</div>;
  }

  return (
    <div>
      <h2 className={styles.bestPostTitle}>베스트 게시글</h2>
      <div className={styles.bestPostContainer}>
        {articles.map((post) => {
          if (!post || typeof post !== "object") {
            return null;
          }
          return (
            <BestCard key={post.id || Math.random().toString()}>
              <BestCardHeader>
                <BestCardTitle>{post.title || "제목 없음"}</BestCardTitle>
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
                  <BestCardAuthor>
                    {post.id ? `${post.id}번 판다` : "익명의 판다"}
                  </BestCardAuthor>
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
                  {post.createdAt ? formatDate(post.createdAt) : "날짜 없음"}
                </div>
              </div>
            </BestCard>
          );
        })}
      </div>
    </div>
  );
};

export default Bestarticles;
