import Image from 'next/image';
import styles from './Postview.module.css';
import { useRouter } from 'next/router';
import React from 'react';

interface Article {
  id: string;
  content: string;
  images: string[];
  userId: string;
  favoriteCount: number;
  createdAt: string;
}

interface PostviewProps {
  articledata: Article;
}

const Postview: React.FC<PostviewProps> = ({ articledata }) => {
  const router = useRouter();

  const pagemove = () => {
    router.push(`/article/${articledata.id}`);
  };

  return (
    <div className={styles.Container} onClick={pagemove}>
      <div className={styles.PostviewContainer}>
        <p>{articledata.content}</p>
        {articledata.images.length > 0 && (
          <Image
            className={styles.PostviewImg}
            src={articledata.images[0]}
            width={300}
            height={300}
            alt="Post Image"
          />
        )}
      </div>
      <div className={styles.PostviewInfo}>
        <div className={styles.Posttitle}>
          <Image src="/MyImg.svg" width={24} height={24} alt="User Profile" />
          <p className={styles.MyName}>{articledata.userId}</p>
          <p className={styles.MyDate}>{articledata.createdAt.slice(0, 10)}</p>
        </div>
        <div>
          <p>♡{articledata.favoriteCount}+</p>
        </div>
      </div>
    </div>
  );
};

export default Postview;
