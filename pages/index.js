import BestPosts from '../src/components/next/BestPosts';
import PostList from '../src/components/next/PostList';

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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 환경 변수 사용

  try {
    const [postsRes, bestPostsRes] = await Promise.all([
      fetch(`${apiUrl}/articles?orderBy=recent`),
      fetch(`${apiUrl}/articles/best`),
    ]);

    if (!postsRes.ok || !bestPostsRes.ok) {
      throw new Error('Failed to fetch data');
    }

    const initialPosts = await postsRes.json();
    const bestPosts = await bestPostsRes.json();

    return {
      props: {
        initialPosts: initialPosts.list,
        bestPosts,
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

