import React from 'react';
import { useRouter } from 'next/router';

const BASE_URL = 'https://one-sprint-mission-be-rzbk.onrender.com/api';

const PostDetail = ({ post }) => {
  const router = useRouter();
  const { id } = router.query;

  // 게시글이 없는 경우 로딩 표시
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>작성자: {post.author || '익명'}</p> 
      <p>좋아요: {post.likes}</p>
      <p>작성일: {new Date(post.date).toLocaleDateString()}</p>
    </div>
  );
};

// 서버 사이드에서 게시글 데이터를 가져옴
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`${BASE_URL}/articles/${id}`);

    // 서버에서 오류 발생 시
    if (!res.ok) {
      throw new Error(`Failed to fetch post with id: ${id}`);
    }

    const post = await res.json();

    return {
      props: { post },
    };
  } catch (error) {
    console.error('Error fetching post:', error);

    // 오류 발생 시 빈 데이터 반환
    return {
      props: { post: null },
    };
  }
}

export default PostDetail;

