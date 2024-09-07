import Image from "next/image";

export default function BestPostItem({ post }) {
  return (
    <div className={styles.bestPostItemCard}>
      <div className={styles.bestIconContainer}>
        <Image
          src="/assets/images/best_icon.png"
          alt={post.title}
          className={styles.bestIcon}
          width={102}
          height={auto}
        />
      </div>
      <div className={styles.postInfo}>
        <div className={styles.titleImage}>
          <h3 className={styles.postTitle}>{post.title}</h3>
          <Image
            src="/images/article.svg"
            alt={post.title}
            className={styles.bestPostImage}
            width={100}
            height={auto}
          />
        </div>
        <div className={styles.authorLikesDateContainer}>
          <div className={styles.authorLikes}>
            <p className={styles.postAuthor}>{post.author}</p>
            <p className={styles.postLikes}>💙 {post.likeCount}</p>
          </div>
          <p className={styles.postDate}>
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
