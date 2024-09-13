import Image from 'next/image';
import Link from 'next/link';
import styles from './PostList.module.css';
import default_img from '@/public/default_img.svg';
import profile_img from '@/public/ic_profile.svg';
import formatDate from '@/lib/formatDate';

export default function PostList({ posts }) {
  // posts가 배열인지 확인
  if (!Array.isArray(posts)) {
    console.error('posts is not an array:', posts);
    return null; // 배열이 아니면 컴포넌트를 렌더링하지 않음
  }

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={styles.postList}>
            <Link href={`/posts/${post.id}`} className={styles.link}>
              <div className={styles.postContainer}>
                <div className={styles.postTop}>
                  <h4 className={styles.postTitle}>
                    {post.title}
                    <span className={styles.commentCount}> [{post.commentCount || 0}]</span>
                  </h4>
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
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
