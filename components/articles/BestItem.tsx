import styles from './BestItem.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Article {
  id: string;
  content: string;
  images: string[];
  userId: string;
  favoriteCount: number;
  createdAt: string;
}

interface BestItemProps {
  article: Article;
}

const BestItem: React.FC<BestItemProps> = ({ article }) => {
  const router = useRouter();

  const pagemove = () => {
    router.push(`/article/${article.id}`);
  };

  return (
    <>
      <div className={styles.GridItem} onClick={pagemove}>
        <div className={styles.BestItem}>
          <div className={styles.BestItemImg}>
            <Image src="/bestItem.svg" fill={true} alt="Best Item" />
          </div>
          <p className={styles.BestItemTitle}>Best</p>
        </div>
        <div className={styles.BestItemContent}>
          <p className={styles.BestItemContentTitle}>{article.content}</p>
          <div className={styles.BestImg}>
            {article.images && article.images.length > 0 && (
              <Image src={article.images[0]} fill={true} alt="logo" />
            )}
          </div>
        </div>
        <div className={styles.BestItemInfo}>
          <p>{article.userId}</p>
          <p>♡{article.favoriteCount}+</p>
          <p className={styles.BestItemDate}>
            {article.createdAt.slice(0, 10)}
          </p>
        </div>
      </div>
    </>
  );
};

export default BestItem;
