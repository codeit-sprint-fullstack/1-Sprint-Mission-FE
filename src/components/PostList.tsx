import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SortOptions from './SortOptions';
import PostItem from './PostItem';
import WriteButton from './WriteButton';
import styles from './PostList.module.css';
import { fetchArticles } from '../api/articleApi';

interface Post {
  id: number;
  title: string;
  user?: {
    nickname?: string;
  };
  createdAt: string;
  likes: { length: number }[];
  image?: string[];
}

interface ArticleResponse {
  id: number;
  title: string;
  user?: {
    nickname?: string;
  };
  createdAt: string;
  likes?: { length: number }[];
  image?: string[];
}

const PostList: React.FC<{ initialPosts?: Post[] }> = ({ initialPosts }) => { // articles/index 페이지에서만 필요하기 때문에 일단 옵셔널 처리
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
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
          const transformedPosts: Post[] = result.map((article) => ({
            ...article,
            likes: article.likes || [],
          }));

          setPosts(transformedPosts);
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
              id={post.id}
              title={post.title}
              author={post.user?.nickname || '푸바오'}
              date={post.createdAt}
              likes={post.likes.length || 0}
              image={post.image?.[0] || '/image/default.svg'}
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
