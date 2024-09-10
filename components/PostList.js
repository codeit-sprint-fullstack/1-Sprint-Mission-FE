import Image from 'next/image';
import styles from './PostList.module.css';
import default_img from '@/public/default_img.svg';
import profile_img from '@/public/ic_profile.svg';
import formatDate from '@/lib/formatDate';

export default function PostList({ posts }) {
  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={styles.postList}>
            <div className={styles.postContainer}>
              <div className={styles.postTop}>
                <h4 className={styles.postTitle}>{post.title}</h4>
                <div className={styles.postImgWrapper}>
                  <Image src={default_img} alt="기본 이미지" />
                </div>
              </div>
              <div className={styles.postBottom}>
                <div className={styles.bottomLeft}>
                  <div className={styles.leftProfileImg}>
                    <Image src={profile_img} alt="사용자 프로필" />
                  </div>
                  <span className={styles.userName}>{post.username}</span>
                  <span className={styles.bestFormatDate}>
                    {formatDate(new Date(post.createdAt))}
                  </span>
                </div>
                <div className={styles.bottomRight}>
                  <span className={styles.like}>❤️ 9999+</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
