import React, { useEffect } from "react";
import { dehydrate, QueryClient } from "react-query";
import { useCommunityPosts } from "@/hooks/useCommunityPosts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import BestPosts from "@/components/community/BestPosts";
import PostList from "@/components/community/PostList";
import SearchSection from "@/components/community/SearchSection";
import { fetchPosts } from "@/utils/communityAPI";
import styles from "@/pages/community/index.module.css";
import SmallButton from "@/components/common/SmallButton";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchInfiniteQuery(["posts", "latest", ""], () =>
      fetchPosts(0, "latest", "")
    );

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        dehydratedState: null,
      },
    };
  } finally {
    queryClient.clear();
  }
}
const Community = () => {
  const {
    posts,
    isLoading,
    isError,
    error,
    sort,
    setSort,
    search,
    setSearch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommunityPosts();

  useInfiniteScroll(fetchNextPage, hasNextPage);

  if (isLoading) {
    return (
      <div className={styles.communityContainer}>
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <div className={styles.communityContainer}>
        에러가 발생했습니다: {error.message}
      </div>
    );
  if (!posts || posts.length === 0)
    return <div className={styles.communityContainer}>게시글이 없습니다.</div>;

  const bestPosts = posts.slice(0, 3);

  return (
    <div className={styles.communityContainer}>
      <BestPosts posts={bestPosts} />
      <div className={styles.buttonSectionHug}>
        게시글 <SmallButton href="/community/write">글쓰기</SmallButton>
      </div>
      <SearchSection
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />
      <PostList posts={posts} isFetchingNextPage={isFetchingNextPage} />
      {isFetchingNextPage && (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
      )}
      {!hasNextPage && posts.length > 0 && null}
    </div>
  );
};

export default Community;
