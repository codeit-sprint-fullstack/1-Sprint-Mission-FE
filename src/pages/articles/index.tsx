import React from "react";
import BestPosts from "../../components/BestPosts";
import PostList from "../../components/PostList";
import { fetchArticles, fetchBestArticles } from "../../api/articleApi";

interface BestPosts {
  id: number;
  title: string;
  user: { nickname: string };
  likes: number;
  createdAt: string;
  image?: string[];
}

interface PostList {
  id: number;
  title: string;
  user?: {
    nickname?: string;
  };
  createdAt: string;
  likes: { length: number }[];
  image?: string[];
}

const BoardPage: React.FC<{
  initialPosts?: PostList[];
  bestPosts?: BestPosts[];
}> = ({ initialPosts = [], bestPosts = [] }) => {
  return (
    <div>
      <BestPosts bestPosts={bestPosts} />
      <PostList initialPosts={initialPosts} />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const [articlesResult, bestPostsResult] = await Promise.allSettled([
      fetchArticles(1, 10, "", "recent"),
      fetchBestArticles(),
    ]);

    console.log("가져온 전체 게시글:", articlesResult);
    console.log("가져온 베스트 게시글:", bestPostsResult);

    const initialPosts =
      articlesResult.status === "fulfilled" ? articlesResult.value || [] : [];
    const bestPosts =
      bestPostsResult.status === "fulfilled" ? bestPostsResult.value || [] : [];

    return {
      props: {
        initialPosts,
        bestPosts,
      },
    };
  } catch (error) {
    console.error("게시글 데이터를 가져오는데 오류가 발생:", (error as Error).message);
    return {
      props: {
        initialPosts: [],
        bestPosts: [],
      },
    };
  }
}

export default BoardPage;

