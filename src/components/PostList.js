import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SortOptions from './SortOptions';
import PostItem from './PostItem';
import WriteButton from './WriteButton';
import styles from './PostList.module.css';

const PostList = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts || []);
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    console.log('New Post Added:', posts);
  };

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

export default PostList;
