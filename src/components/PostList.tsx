import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SortOptions from './SortOptions';
import PostItem from './PostItem';
import WriteButton from './WriteButton';
import styles from './PostList.module.css';
import { fetchArticles, ArticleResponse } from '../api/articleApi';

const PostList = ({ initialPosts }: { initialPosts?: ArticleResponse[] }) => {
  const [posts, setPosts] = useState<ArticleResponse[]>(initialPosts || []);
  const [loading, setLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('recent');

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
      setLoading(false);
    } else {
      const loadPosts = async () => {
        try {
          const result = await fetchArticles(1, 10, '', 'recent') as ArticleResponse[];
          console.log("게시글 API 응답:", result);
          setPosts(result);
        } catch (error) {
          console.error('게시글을 가져오는데 오류가 발생했습니다.:', error);
        } finally {
          setLoading(false);
        }
      };

      loadPosts();
    }
  }, [initialPosts]);

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
        <SortOptions
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          setProducts={setPosts}
          screenType="pc"
        />
      </div>

      <div className={styles.posts}>
        {loading ? (
          <p>로딩 중...</p>
        ) : posts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostItem
              key={post.id}
              article={post}
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
