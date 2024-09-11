import React, { useState, useEffect } from 'react';
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

  // 새 게시글 추가 함수
  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]); // 새로운 게시글을 맨 앞에 추가
  };

  // 새 게시글 감지 (localStorage를 통해 등록된 새 게시물 확인)
  useEffect(() => {
    const storedNewPost = localStorage.getItem('newPost');
    if (storedNewPost) {
      const parsedPost = JSON.parse(storedNewPost);
      addNewPost(parsedPost);
      localStorage.removeItem('newPost'); // 새 게시물을 목록에 추가한 후 localStorage에서 삭제
    }
  }, []);

  const filteredPosts = keyword
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(keyword.toLowerCase())
      )
    : posts;


  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortOrder === 'recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === 'popular') {
      return parseInt(b.likes) - parseInt(a.likes);
    }
    return 0;
  });

  return (
    <div className={styles.postList}>
      <div className={styles.titleWriteContainer}>
        <h2 className={styles.postTitle}>게시글</h2>
        <WriteButton onNewPost={addNewPost} />
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

