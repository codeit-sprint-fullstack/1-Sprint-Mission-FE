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

  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]); 
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(keyword.toLowerCase())
  );

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

      <div className={styles.posts}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostItem
              key={index}
              id={post.id}
              title={post.title}
              author={post.author}
              date={post.date}
              likes={post.likes}
              image={post.image}
            />
          ))
        ) : (
          <p>게시글이 없습니다.</p>  
        )}
      </div>
    </div>
  );
};

// 서버 사이드 렌더링을 통해 게시글 목록 가져오기
export async function getServerSideProps() {
  try {
    const data = await fetchArticles({ page: 1, pageSize: 10, orderBy: 'recent' }); 
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

