import BestPosts from '../src/components/next/BestPosts';
import PostList from '../src/components/next/PostList';
import { fetchArticles, fetchBestArticles } from '../src/api/api'; // api.js에서 함수 가져오기

const BoardPage = ({ initialPosts, bestPosts }) => {
  return (
    <div>
      <BestPosts bestPosts={bestPosts} />
      <PostList initialPosts={initialPosts} />
    </div>
  );
};

// 서버 사이드에서 게시글 목록과 베스트 게시글을 모두 가져옴
export async function getServerSideProps() {
  try {
    // api.js 파일에서 함수 호출
    const [initialPosts, bestPosts] = await Promise.all([
      fetchArticles({ orderBy: 'recent' }),
      fetchBestArticles(),
    ]);

    return {
      props: {
        initialPosts: initialPosts.list || [], // 초기 게시글
        bestPosts: bestPosts || [], // 베스트 게시글
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

