import React from 'react';
import BestPosts from '../../components/BestPosts';
import PostList from '../../components/PostList';
import { fetchArticles, fetchBestArticles } from '../../api/articleApi';

const BoardPage = ({ initialPosts, bestPosts }) => {
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
      fetchArticles(1, 10, '', 'recent'),
      fetchBestArticles(),
    ]);

    console.log('Articles Result:', articlesResult);
    console.log('Best Posts Result:', bestPostsResult);

    const initialPosts = articlesResult.status === 'fulfilled' ? articlesResult.value.list || [] : [];
    const bestPosts = bestPostsResult.status === 'fulfilled' ? bestPostsResult.value || [] : [];

    return {
      props: {
        initialPosts,
        bestPosts,
      },
    };
  } catch (error) {
    console.error('데이터를 가져오는데 오류가 발생:', error.message);
    return {
      props: {
        initialPosts: [],
        bestPosts: [],
      },
    };
  }
}


export default BoardPage;
