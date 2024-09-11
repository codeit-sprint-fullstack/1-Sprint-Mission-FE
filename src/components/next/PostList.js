import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SortOptions from './SortOptions';
import PostItem from './PostItem';
import WriteButton from './WriteButton';
import styles from './PostList.module.css';
import { fetchArticles } from '../../api/api';

const PostList = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts || []);

  // 새 게시글 추가 함수
  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]); // 새로운 게시글을 맨 앞에 추가
  };

  // 검색어에 따른 게시글 필터링
  const filteredPosts = posts;

  return (
    <div className={styles.postList}>
      <div className={styles.titleWriteContainer}>
        <h2 className={styles.postTitle}>게시글</h2>
        <WriteButton onNewPost={addNewPost} />
      </div>

      <div className={styles.posts}>
        {filteredPosts.length > 0 &&
          filteredPosts.map((post, index) => (
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

