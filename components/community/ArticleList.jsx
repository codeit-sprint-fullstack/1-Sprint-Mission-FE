import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/dateUtils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAuthor,
} from "@/components/common/Card";
import styles from "@/pages/community/index.module.css";

const ArticleList = ({ articles, isFetchingNextPage }) => {
  if (!articles || articles.length === 0) {
    return <div className={styles.postCardContainer}>게시글이 없습니다.</div>;
  }

  return (
    <div className={styles.postCardContainer}>
      {articles.map((post) => {
        if (!post || typeof post !== "object") {
          console.warn("Invalid post object:", post);
          return null;
        }

        return (
          <Link
            href={`/community/articles/${post.id}`}
            key={post.id || Math.random().toString()}
          >
            <Card>
              <CardHeader>
                <CardTitle>{post.title || "제목 없음"}</CardTitle>
                <Image
                  src="/images/defaultImage.svg"
                  alt="DefaultImage"
                  width={100}
                  height={100}
                  layout="fixed"
                />
              </CardHeader>
              <CardContent />
              <div className={styles.BottomHug}>
                <div className={styles.authorImageHug}>
                  <Image
                    src="/images/ic_profile.svg"
                    alt="profile_icon"
                    width={24}
                    height={24}
                  />
                  <CardAuthor>
                    {post.writer?.nickname || `${post.id || "Unknown"}번 판다`}
                  </CardAuthor>
                  <div className={styles.bestPostDate}>
                    {post.createdAt ? formatDate(post.createdAt) : "날짜 없음"}
                  </div>
                </div>
                <div className={styles.likesHug}>
                  <Image
                    src="/images/ic_heart.svg"
                    alt="heart_icon"
                    width={16}
                    height={16}
                  />
                  {post.likeCount || 0}
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
      {isFetchingNextPage && <div>더 많은 게시글을 불러오는 중...</div>}
    </div>
  );
};

export default ArticleList;
