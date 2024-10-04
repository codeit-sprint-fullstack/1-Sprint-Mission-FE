import React from "react";
import Link from "next/link";
import { formatDate } from "@/utils/dateUtils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAuthor,
} from "@/components/common/Card";
import styles from "@/pages/community/index.module.css";

const PostList = ({ posts, isFetchingNextPage }) => (
  <div className={styles.postCardContainer}>
    {posts.map((post) => (
      <Link href={`/community/posts/${post.id}`} key={post.id}>
        <Card>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <img src="/images/defaultImage.svg" alt="DefaultImage" />
          </CardHeader>
          <CardContent>
            <div className="mt-2 text-sm text-gray-500"></div>
          </CardContent>
          <div className={styles.BottomHug}>
            <div className={styles.authorImageHug}>
              <img src="/images/ic_profile.svg" alt="profile_icon" />
              <CardAuthor>{post.author_name}</CardAuthor>
              <div className={styles.bestPostDate}>
                {formatDate(post.created_at)}
              </div>
            </div>
            <div className={styles.likesHug}>
              <img src="/images/ic_heart.svg" alt="heart_icon" />
              9999+
            </div>
          </div>
        </Card>
      </Link>
    ))}
  </div>
);

export default PostList;
