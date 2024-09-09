import Image from "next/image";
import styles from "./Postview.module.css";
import { useRouter } from "next/router";
export default function Postview(articledata) {
  const router = useRouter();
  const pagemove = () => {
    router.push(`/post/${articledata.articledata.id}`);
  };
  return (
    <div className={styles.Container} onClick={pagemove}>
      <div className={styles.PostviewContainer}>
        <p>{articledata.articledata.title}</p>
        <Image
          className={styles.PostviewImg}
          src="/ItemImg.svg"
          width={300}
          height={300}
        ></Image>
      </div>
      <div className={styles.PostviewInfo}>
        <div className={styles.Posttitle}>
          <Image src="/MyImg.svg" width={24} height={24} />
          <p className={styles.MyName}>{articledata.articledata.name}</p>
          <p className={styles.MyDate}>
            {articledata.articledata.createAt.slice(0, 10)}
          </p>
        </div>
        <div>
          <p>♡{articledata.articledata.like}+</p>
        </div>
      </div>
    </div>
  );
}
