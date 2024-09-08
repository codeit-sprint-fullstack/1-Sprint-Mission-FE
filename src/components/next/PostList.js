import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SortOptions from './SortOptions';
import styles from './PostList.module.css'; // CSS 모듈 사용

const PostList = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

  const fetchPosts = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 환경 변수 사용
    const response = await fetch(
      `${apiUrl}/articles?orderBy=${sortOrder}&keyword=${keyword}`
    );
    const data = await response.json();
    setPosts(data.list);
  };

  // 검색어 또는 정렬 변경 시 API 호출
  const handleSearch = async (keyword) => {
    setKeyword(keyword);
    await fetchPosts();
  };

  const handleSort = async (sortOrder) => {
    setSortOrder(sortOrder);
    await fetchPosts();
  };

  return (
    <div className={styles.postList}>
      <SearchBar setKeyword={handleSearch} />
      <SortOptions setSortOrder={handleSort} />
      <div className={styles.posts}>
        {posts.map((post) => (
          <div key={post.id} className={styles.postItem}>
            <h3>{post.title}</h3>
            <p>{post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 서버 사이드 렌더링을 통해 게시글 목록 가져오기
export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 환경 변수 사용
  try {
    const response = await fetch(`${apiUrl}/articles?orderBy=recent`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return {
      props: { initialPosts: data.list }, // initialPosts를 props로 전달
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: { initialPosts: [] }, // 에러 발생 시 빈 배열 전달
    };
  }
}

export default PostList;

