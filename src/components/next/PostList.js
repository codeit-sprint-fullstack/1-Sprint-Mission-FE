import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SortOptions from './SortOptions';
import PostItem from './PostItem';
import WriteButton from './WriteButton';
import styles from './PostList.module.css'; 

const PostList = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts || []); // 게시글 리스트
  const [keyword, setKeyword] = useState(''); // 검색어 상태
  const [sortOrder, setSortOrder] = useState('recent'); // 정렬 상태

  // 기본값을 포함한 게시글 리스트 처리
  const defaultPost = {
    title: '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?',
    author: '총명한 판다',
    date: '2024.04.16',
    likes: '9999+',
    image: '/image/default.svg',
  };

  const combinedPosts = posts.length > 0 ? posts : [defaultPost]; // 기본값 포함

  // 검색어에 따른 게시글 필터링
  const filteredPosts = keyword
    ? combinedPosts.filter((post) =>
        post.title.toLowerCase().includes(keyword.toLowerCase())
      )
    : combinedPosts;

  // 게시글 정렬 처리
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortOrder === 'recent') {
      return new Date(b.date) - new Date(a.date); // 최근순
    } else if (sortOrder === 'popular') {
      return parseInt(b.likes) - parseInt(a.likes); // 인기순
    }
    return 0;
  });

  return (
    <div className={styles.postList}>
      {/* 게시글과 글쓰기 버튼을 같은 줄에 배치하는 컨테이너 */}
      <div className={styles.titleWriteContainer}>
        <h2 className={styles.postTitle}>게시글</h2>
        <WriteButton /> {/* 글쓰기 버튼 */}
      </div>

      {/* 검색창과 정렬 옵션 */}
      <div className={styles.searchSortContainer}>
        <SearchBar setKeyword={setKeyword} />
        <SortOptions setSortOrder={setSortOrder} /> 
      </div>

      {/* 검색 결과가 없을 때 빨간 글씨로 메시지 표시 */}
      {keyword && sortedPosts.length === 0 && (
        <div className={styles.noPosts}>검색 결과가 없습니다.</div>
      )}

      {/* 게시글 목록 */}
      <div className={styles.posts}>
        {sortedPosts.length > 0 &&
          sortedPosts.map((post, index) => (
            <PostItem
              key={index}
              title={post.title}
              author={post.author}
              date={post.date}
              likes={post.likes}
              image={post.image}
            />
          ))}
      </div>
    </div>
  );
};

// 서버 사이드 렌더링을 통해 게시글 목록 가져오기
export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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
