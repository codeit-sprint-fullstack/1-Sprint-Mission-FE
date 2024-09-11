import React, { useState, useMemo } from "react";
import { useQuery, dehydrate, QueryClient } from "react-query";
import Link from "next/link";
import { Select, Input } from "../components/ui/Input.jsx";
import styles from "./community.module.css";
import { formatDate } from "@/utils/dateUtils";
import SmallButton from "../components/ui/SmallButton.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAuthor,
} from "../components/ui/Card.jsx";
import {
  BestCard,
  BestCardContent,
  BestCardHeader,
  BestCardTitle,
  BestCardAuthor,
} from "../components/ui/BestCard.jsx";

const fetchPosts = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/community/posts`);
  if (!response.ok) {
    throw new Error("게시글 조회를 실패했습니다");
  }
  return response.json();
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery("posts", fetchPosts);
  } catch (error) {
    console.error("Failed to prefetch posts:", error);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Community = () => {
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");

  const {
    data: allPosts,
    isLoading,
    isError,
    error,
  } = useQuery("posts", fetchPosts, {
    staleTime: 60000,
    retry: 3,
  });

  const filteredAndSortedPosts = useMemo(() => {
    if (!allPosts) return [];

    let result = allPosts;

    if (search) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sort === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sort === "likes") {
        return b.likes - a.likes;
      }
      return 0;
    });

    return result;
  }, [allPosts, sort, search]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!allPosts) return null;

  const bestPosts = filteredAndSortedPosts.slice(0, 3);

  return (
    <div className={styles.communityContainer}>
      <div>
        <h2 className={styles.bestPostTitle}>베스트 게시글</h2>
        <div className={styles.bestPostContainer}>
          {bestPosts.map((post) => (
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

      <div className={styles.buttonSectionHug}>
        게시글 <SmallButton>글쓰기</SmallButton>
      </div>

      <div className={styles.searchSectionHug}>
        <Input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-40"
        >
          <option value="latest">최신 순</option>
          <option value="likes">좋아요 순</option>
        </Select>
      </div>

      <div className={styles.postCardContainer}>
        {filteredAndSortedPosts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
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
    </div>
  );
};

export default Community;
