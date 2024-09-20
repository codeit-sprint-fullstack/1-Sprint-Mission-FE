import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SortOptions from './SortOptions';
import PostItem from './PostItem';
import WriteButton from './WriteButton';
import styles from './PostList.module.css';
import { fetchArticles } from '../api/api';

const PostList = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts || []);
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    console.log('New Post Added:', posts);
  };

  // 키워드 검색을 통한 필터링된 게시글 목록
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(keyword.toLowerCase())
  );
  console.log('Filtered posts:', filteredPosts);

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

      <div className={styles.posts}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostItem
              key={index}
              id={post.id}
              title={post.title}
              author={post.author}
              date={post.createdAt}
              likes={post.likes || 0}
              image={post.image || '/image/default.svg'}
            />
          ))
        ) : (
          <p>게시글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

// 서버 사이드 렌더링으로 게시글 가져오기
export async function getServerSideProps() {
  try {
    const data = await fetchArticles({ page: 1, pageSize: 10, orderBy: 'recent' });
    console.log('Fetched articles data:', data);
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

