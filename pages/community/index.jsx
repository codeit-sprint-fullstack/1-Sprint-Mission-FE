import React from "react";
import { useCommunityArticles } from "@/hooks/useCommunityArticles";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import ArticleList from "@/components/community/ArticleList";
import SearchSection from "@/components/community/SearchSection";
import styles from "@/pages/community/index.module.css";
import SmallButton from "@/components/common/SmallButton";

const Community = () => {
  const {
    articles,
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
  } = useCommunityArticles();

  useInfiniteScroll(fetchNextPage, hasNextPage);

  console.log("컴포넌트내 데이터:", articles);
  console.log("로딩여부:", isLoading);
  console.log("에러여부:", isError);
  console.log("에러:", error);

  if (isLoading) {
    return <div className={styles.communityContainer}>로딩 중...</div>;
  }

  if (isError) {
    return (
      <div className={styles.communityContainer}>
        에러 발생: {error.message}
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return <div className={styles.communityContainer}>게시글이 없습니다.</div>;
  }

  return (
    <div className={styles.communityContainer}>
      <div className={styles.buttonSectionHug}>
        게시글 <SmallButton href="/community/write">글쓰기</SmallButton>
      </div>
      <SearchSection
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />
      <ArticleList
        articles={articles.filter(
          (article) => article !== null && article !== undefined
        )}
        isFetchingNextPage={isFetchingNextPage}
      />
      {isFetchingNextPage && <div>추가 게시글을 불러오는 중...</div>}
    </div>
  );
};

export default Community;
