import BestPosts from '../../components/BestPosts';
import PostList from '../../components/PostList';
import { fetchArticles, fetchBestArticles } from '../../api/api';

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
      fetchArticles({ orderBy: 'recent' }),
      fetchBestArticles(),
    ]);

    const initialPosts = articlesResult.status === 'fulfilled' ? articlesResult.value.list : [];
    const bestPosts = bestPostsResult.status === 'fulfilled' ? bestPostsResult.value : [];

    return {
      props: {
        initialPosts, // 초기 게시글
        bestPosts,    // 베스트 게시글
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        initialPosts: [],
        bestPosts: [],
      },
    };
  }
}

export default BoardPage;

