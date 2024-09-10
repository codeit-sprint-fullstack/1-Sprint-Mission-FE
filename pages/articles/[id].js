import React from 'react';
import { useRouter } from 'next/router';
import { fetchArticleById } from '../../src/api/api'; // api.js에서 함수 가져오기

const PostDetail = ({ post }) => {
  const router = useRouter();
  const { id } = router.query; // 현재 게시글 ID를 가져옴

  if (!post) {
    return <div>Loading...</div>; // 데이터가 없을 때 로딩 표시
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>작성자: {post.author}</p>
      <p>좋아요: {post.likes}</p>
      <p>작성일: {post.date}</p>
    </div>
  );
};

// 서버 사이드에서 게시글 데이터를 가져옴
export async function getServerSideProps(context) {
  const { id } = context.params; // URL의 ID 값

  try {
    // api.js 파일에서 정의된 함수로 게시글 가져오기
    const post = await fetchArticleById(id);

    return {
      props: { post }, // post를 props로 전달
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      props: { post: null }, // 오류 발생 시 null 전달
    };
  }
}

export default PostDetail;

