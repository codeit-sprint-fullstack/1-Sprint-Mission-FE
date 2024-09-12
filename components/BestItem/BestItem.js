import styles from "@/components/BestItem/BestItem.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BestItem(article) {
  const router = useRouter();
  const pagemove = () => {
    router.push(`/post/${article.article.id}`);
    // console.log(article.article.id);
  };
  return (
    <>
      <div className={styles.GridItem} onClick={pagemove}>
        <div className={styles.BestItem}>
          <div className={styles.BestItemImg}>
            <Image src="/bestItem.svg" fill={true} />
          </div>
          <p className={styles.BestItemTitle}>Best</p>
        </div>
        <div className={styles.BestItemContent}>
          <p className={styles.BestItemContentTitle}>{article.article.title}</p>
          <div className={styles.BestImg}>
            <Image src="/ItemImg.svg" fill={true} alt="logo" />
          </div>
        </div>
        <div className={styles.BestItemInfo}>
          <p>{article.article.name}</p>
          <p>♡{article.article.like}+</p>
          <p className={styles.BestItemDate}>
            {article.article.createAt.slice(0, 10)}
          </p>
        </div>
      </div>
    </>
  );
}
