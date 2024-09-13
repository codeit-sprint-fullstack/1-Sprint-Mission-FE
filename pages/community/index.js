import React from "react";
import { dehydrate, QueryClient, useQueryClient } from "react-query";
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

  await queryClient.prefetchInfiniteQuery(["posts"], () => fetchPosts(0));

  const dehydratedState = dehydrate(queryClient);

  dehydratedState.queries.forEach((query) => {
    if (query.state.data?.pageParams) {
      query.state.data.pageParams = query.state.data.pageParams.filter(
        (param) => param !== undefined
      );
    }
  });

  return {
    props: {
      dehydratedState,
    },
  };
}
const Community = () => {
  const queryClient = useQueryClient();
  const {
    posts,
    isLoading,
    isError,
    error,
    sort,
    setSort,
    search,
    setSearch,
    filteredAndSortedPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommunityPosts();

  useInfiniteScroll(fetchNextPage, hasNextPage);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!posts) return null;

  const bestPosts = filteredAndSortedPosts.slice(0, 3);

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
      <PostList
        posts={filteredAndSortedPosts}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default Community;
