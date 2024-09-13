import Image from 'next/image';
import Link from 'next/link';
import styles from './BestPost.module.css';
import default_img from '@/public/default_img.svg';
import bestBanner from '@/public/bestBanner.svg';
import formatDate from '@/lib/formatDate';

export default function BestPost({ posts = [] }) {
  // posts가 배열인지 확인
  if (!Array.isArray(posts)) {
    console.error('posts is not an array:', posts);
    return null; // 배열이 아니면 컴포넌트를 렌더링하지 않음
  }

  return (
    <>
      <h4 className={styles.bestTitle}>베스트 게시글</h4>
      <ul className={styles.bestContainer}>
        {posts.map((post) => (
          <div className={styles.bestListBox} key={post.id}>
            <Link href={`/posts/${post.id}`} className={styles.link}>
              <div className={styles.bestBanner}>
                <Image src={bestBanner} alt="베스트 게시글 배너 이미지" />
              </div>
              <li>
                <div className={styles.bestTop}>
                  <h4>{post.title}</h4>
                  <div className={styles.postImgWrapper}>
                    <Image src={default_img} alt="기본 이미지" />
                  </div>
                </div>
                <div className={styles.bestBottom}>
                  <div className={styles.bottomLeft}>
                    <span className={styles.userName}>{post.username}</span>
                    <span className={styles.like}>❤️9999+</span>
                  </div>
                  <div className={styles.bestFormatDate}>
                    {formatDate(new Date(post.createdAt))}
                  </div>
                </div>
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </>
  );
}
