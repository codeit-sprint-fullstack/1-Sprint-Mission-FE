import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './BestPosts.module.css';
import { fetchBestArticles } from '../api/articleApi';

interface User {
  nickname: string;
}

interface BestPost {
  id: number;
  title: string;
  user: User;
  likes: number;
  createdAt: string;
  image?: string[];
}

interface ArticleResponse {
  id: number;
  title: string;
  createdAt: string;
  image?: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toISOString().slice(0, 10).replace(/-/g, '.');
};

interface BestBoxProps {
  id: number;
  title: string;
  user: User;
  likes: number;
  date: string;
  image?: string[];
}

const BestBox: React.FC<BestBoxProps> = ({ id, title, user, likes, date, image }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/articles/${id}`);
  };

  return (
    <div className={styles.bestBox} onClick={handleClick}>
      <img src="/image/best.svg" alt="Best Icon" className={styles.bestIcon} />
      <h3 className={styles.bestTitle}>{title || '제목 없음'}</h3>
      <img
        src={image && image.length > 0 ? image[0] : '/image/next_default.svg'}
        alt="Post Image"
        className={styles.bestImage}
      />
      <div className={styles.bestFooter}>
        <span className={styles.bestAuthor}>{user?.nickname || '푸바오'}</span>
        <div className={styles.bestLikes}>
          <img src="/image/heart.svg" alt="Heart Icon" />
          <span>{likes || '0'}</span>
        </div>
        <span className={styles.bestDate}>{formatDate(date)}</span>
      </div>
    </div>
  );
};

const BestPosts: React.FC<{ bestPosts?: BestPost[] }> = ({ bestPosts }) => {
  const [bestPostsState, setBestPosts] = useState<BestPost[]>(bestPosts || []); // articles/index 페이지에서만 필요하기 때문에 일단 옵셔널 처리
  const [loading, setLoading] = useState<boolean>(true);
  const [columns, setColumns] = useState<number>(3);

  useEffect(() => {
    const loadBestPosts = async () => {
      try {
        const result: ArticleResponse[] = await fetchBestArticles();
        const formattedPosts: BestPost[] = result.map((post) => ({
          id: post.id,
          title: post.title,
          user: { nickname: '푸바오' },
          likes: 0,
          createdAt: post.createdAt,
          image: post.image ? [post.image] : undefined,
        }));
        setBestPosts(formattedPosts);
      } catch (error) {
        console.error('베스트 게시글을 가져오는데 오류가 발생했습니다. :', error);
      } finally {
        setLoading(false);
      }
    };

    if (!bestPosts) {
      loadBestPosts();
    }

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 744) {
        setColumns(1);
      } else if (width >= 744 && width < 1200) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [bestPosts]);

  if (loading) {
    return <div className={styles.loadingMessage}>로딩 중...</div>;
  }

  if (!Array.isArray(bestPostsState) || bestPostsState.length === 0) {
    return <div className={styles.noPostsMessage}>베스트 게시글이 없습니다.</div>;
  }

  return (
    <div className={styles.bestPostsContainer}>
      <h2 className="section-title">베스트 게시글</h2>
      <div className={styles.bestPosts} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {bestPostsState.map((post) => (
          <BestBox
            key={post.id}
            id={post.id}
            title={post.title}
            user={post.user}
            likes={post.likes}
            date={post.createdAt}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
};

export default BestPosts;

