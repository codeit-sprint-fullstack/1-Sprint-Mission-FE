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

const PostList = ({ posts, isFetchingNextPage }) => (
  <div className={styles.postCardContainer}>
    {posts.map((post) => (
      <Link href={`/community/posts/${post.id}`} key={post.id}>
        <Card>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <Image
              src="/images/defaultImage.svg"
              alt="DefaultImage"
              width={100}
              height={100}
              layout="fixed"
            />
          </CardHeader>
          <CardContent>
            <div className="mt-2 text-sm text-gray-500"></div>
          </CardContent>
          <div className={styles.BottomHug}>
            <div className={styles.authorImageHug}>
              <Image
                src="/images/ic_profile.svg"
                alt="profile_icon"
                width={24}
                height={24}
              />
              <CardAuthor>{post.author_name}</CardAuthor>
              <div className={styles.bestPostDate}>
                {formatDate(post.created_at)}
              </div>
            </div>
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
        </Card>
      </Link>
    ))}
  </div>
);

export default PostList;
