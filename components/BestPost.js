import Image from 'next/image';
import styles from './BestPost.module.css';
import default_img from '@/public/default_img.svg';
import formatDate from '@/lib/formatDate';

export default function BestPost({ posts = [] }) {
  return (
    <>
      <h4>베스트 게시글</h4>
      <ul className={styles.bestContainer}>
        {posts.map((post) => (
          <li key={post.id}>
            <div className={styles.bestTop}>
              <h4>{post.title}</h4>
              <Image src={default_img} alt="기본 이미지" />
            </div>
            <div className={styles.bestBottom}>
              <span>{post.username}</span>
              <span>❤️ 9999+</span>
              <div className={styles.bestFormatDate}>{formatDate(new Date(post.createdAt))}</div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
