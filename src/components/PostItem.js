import Image from "next/image";
import AuthorProfile from "../../public/images/profile-image.png"; // 이미지 경로

export default function PostItem({ post }) {
  return (
    <div className={styles.postItem}>
      <div className={styles.postHeader}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <Image
          src="/images/article.svg"
          alt={post.title}
          className={styles.bestPostImage}
          width={100}
          height={auto}
        />
      </div>
      <div className={styles.postFooter}>
        <div className={styles.postAuthorDate}>
          <Image
            src={AuthorProfile}
            alt="Profile"
            className={styles.profileImage}
            width={24}
            height={24}
          />
          <span className={styles.authorName}>{post.author}</span>
          <span className={styles.postDate}>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <span className={styles.likeCount}>💙 {post.likeCount}</span>
      </div>
    </div>
  );
}
