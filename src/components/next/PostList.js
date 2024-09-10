import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SortOptions from './SortOptions';
import PostItem from './PostItem';
import WriteButton from './WriteButton';
import styles from './PostList.module.css'; 
import { fetchArticles } from '../../api/api'; 

const PostList = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts || []); 
  const [keyword, setKeyword] = useState(''); 
  const [sortOrder, setSortOrder] = useState('recent'); 

  // 데이터가 없을 때 보여줄 기본값
  const defaultPost = {
    title: '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?',
    author: '총명한 판다',
    date: '2024.04.16',
    likes: '9999+',
    image: '/image/default.svg',
  };

  const combinedPosts = posts.length > 0 ? posts : [defaultPost];

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
      <div className={styles.titleWriteContainer}>
        <h2 className={styles.postTitle}>게시글</h2>
        <WriteButton />
      </div>

      <div className={styles.searchSortContainer}>
        <SearchBar setKeyword={setKeyword} />
        <SortOptions setSortOrder={setSortOrder} /> 
      </div>

      {keyword && sortedPosts.length === 0 && (
        <div className={styles.noPosts}>검색 결과가 없습니다.</div>
      )}

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
              isDefault={posts.length === 0}  // 기본값 여부를 전달
            />
          ))}
      </div>
    </div>
  );
};

// 서버 사이드 렌더링을 통해 게시글 목록 가져오기
export async function getServerSideProps() {
  try {
    const data = await fetchArticles({ orderBy: 'recent' });
    return {
      props: { initialPosts: data.list },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: { initialPosts: [] },
    };
  }
}

export default PostList;
