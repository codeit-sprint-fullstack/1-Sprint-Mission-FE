import Image from 'next/image';
import styles from './BestPost.module.css';
import default_img from '@/public/default_img.svg';
import bestBanner from '@/public/bestBanner.svg';
import formatDate from '@/lib/formatDate';

export default function BestPost({ posts = [] }) {
  return (
    <>
      <h4 className={styles.bestTitle}>베스트 게시글</h4>
      <ul className={styles.bestContainer}>
        {posts.map((post) => (
          <div className={styles.bestListBox} key={post.id}>
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
                <div className={styles.bestFormatDate}>{formatDate(new Date(post.createdAt))}</div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}
