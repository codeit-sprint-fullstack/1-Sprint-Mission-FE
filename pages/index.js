import BestPosts from '../src/components/next/BestPosts';
import PostList from '../src/components/next/PostList';
import { useState } from 'react';

const BASE_URL = 'https://one-sprint-mission-be-rzbk.onrender.com/api';

const BoardPage = ({ initialPosts, bestPosts }) => {
  const [posts, setPosts] = useState(initialPosts); // 게시글 상태 관리

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]); // 새 게시글을 기존 목록에 추가
  };

  return (
    <div>
      <BestPosts bestPosts={bestPosts} />
      <PostList posts={posts} /> {/* 갱신된 posts 전달 */}
      <CreateArticle onNewPost={handleNewPost} /> {/* 새 게시글 등록 핸들러 전달 */}
    </div>
  );
};

// 서버 사이드에서 게시글 목록과 베스트 게시글을 모두 가져옴
export async function getServerSideProps() {
  try {
    const [postsRes, bestPostsRes] = await Promise.all([
      fetch(`${BASE_URL}/articles?orderBy=recent`),
      fetch(`${BASE_URL}/articles/best`),
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

