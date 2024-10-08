import Image from "next/image";
import styles from "./Postview.module.css";
import { useRouter } from "next/router";
export default function Postview(articledata) {
  const router = useRouter();
  const pagemove = () => {
    router.push(`/article/${articledata.articledata.id}`);
    // console.log(articledata);
  };
  // console.log(articledata);
  return (
    <div className={styles.Container} onClick={pagemove}>
      <div className={styles.PostviewContainer}>
        <p>{articledata.articledata.content}</p>
        <Image
          className={styles.PostviewImg}
          src={articledata.articledata.images[0]}
          width={300}
          height={300}
        ></Image>
      </div>
      <div className={styles.PostviewInfo}>
        <div className={styles.Posttitle}>
          <Image src="/MyImg.svg" width={24} height={24} />
          <p className={styles.MyName}>{articledata.articledata.userId}</p>
          <p className={styles.MyDate}>
            {articledata.articledata.createdAt.slice(0, 10)}
          </p>
        </div>
        <div>
          <p>♡{articledata.articledata.favoriteCount}+</p>
        </div>
      </div>
    </div>
  );
}
