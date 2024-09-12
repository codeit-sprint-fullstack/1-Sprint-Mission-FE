import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useInfiniteQuery, dehydrate, QueryClient } from "react-query";
import Link from "next/link";
import { Select, Input } from "../../components/ui/Input.jsx";
import styles from "./index.module.css";
import { formatDate } from "@/utils/dateUtils";
import SmallButton from "../../components/ui/SmallButton.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAuthor,
} from "@/components/ui/Card.jsx";
import {
  BestCard,
  BestCardContent,
  BestCardHeader,
  BestCardTitle,
  BestCardAuthor,
} from "@/components/ui/BestCard.jsx";

const POSTS_PER_PAGE = 3;

const fetchPosts = async ({ pageParam = 0 }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(
    `${baseUrl}/api/community/posts?page=${pageParam}&limit=${POSTS_PER_PAGE}`
  );
  if (!response.ok) {
    throw new Error("게시글 조회를 실패했습니다");
  }
  const data = await response.json();
  return {
    posts: data.posts,
    nextPage: data.hasNextPage ? pageParam + 1 : null,
    totalPages: data.totalPages,
  };
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchInfiniteQuery("posts", fetchPosts, {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });
  } catch (error) {
    console.error("조회 실패:", error);
  }

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

const Community = () => {
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 60000,
    retry: 3,
  });

  const allPosts = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.posts) : [];
  }, [data]);

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
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sort === "likes") {
        return b.likes - a.likes;
      }
      return 0;
    });

    return result;
  }, [allPosts, sort, search]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
        게시글 <SmallButton href="/community/write">글쓰기</SmallButton>
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
        {isFetchingNextPage && <div className={styles.spinner}></div>}
      </div>
    </div>
  );
};

export default Community;
