import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SortOptions from './SortOptions';
import PostItem from './PostItem';
import WriteButton from './WriteButton';
import styles from './PostList.module.css';
import { fetchArticles } from '../api/articleApi';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const result = await fetchArticles(1, 10, '', 'recent');
        console.log("게시글 API 응답:", result);
        setPosts(result);
      } catch (error) {
        console.error('게시글을 가져오는데 오류가 발생했습니다.:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(keyword.toLowerCase())
  );

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
        {loading ? (
          <p>로딩 중...</p>
        ) : posts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostItem
              key={index}
              id={post.id}
              title={post.title}
              author={post.user?.nickname || '푸바오'}
              date={post.createdAt}
              likes={post.likes.length || 0}
              image={post.image[0] || '/image/default.svg'}
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


