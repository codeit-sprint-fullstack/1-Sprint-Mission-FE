import Image from "next/image";
import axios from "@/lib/axios";
import styles from "@/styles/BoardDetail.module.css";
import defaultUserImg from "@/images/defaultUserImg.png";
import borderLine from "@/images/borderLine.png";
import goBack from "@/images/ic_back.png";
import Link from "next/link";

export async function getServerSideProps(context) {
  const articleId = context.params["id"];
  let article;
  try {
    const res = await axios.get(`/articles/${articleId}`);
    article = res.data;
  } catch {
    // 404 NotFound 페이지
    // return {
    //   notFound: true,
    // }
  }

  return {
    props: {
      article,
    },
  };
}

// article없으면 로딩일때 돌아가는 Spinner같은 로딩창
// if (!article)
//   return (
//     <div className={styles.loading}>
//       <Spinner />
//     </div>
//   );

export default function BoardDetail(article) {
  const detailArticle = article.article;

  // test
  console.log(detailArticle);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>{detailArticle.title}</span>
          {/* DropDown 넣을 공간 */}
          <div className={styles.articleInfoContainer}>
            <div className={styles.articleInfo}>
              <Image src={defaultUserImg} alt="user" />
              <span className={styles.user}>총명한판다</span>
              <span className={styles.date}>{detailArticle.createdAt}</span>
            </div>
            <Image src={borderLine} alt="line" />
            <button className={styles.favorite}>🤍 123</button>
          </div>
        </div>
        <span className={styles.content}>{detailArticle.content}</span>
      </div>
      {/* 댓글 달기 컴포넌트 넣을 공간 */}
      {/* 댓글 목록 컴포넌트 넣을 공간 */}
      <Link href={"/board"} className={styles.goBackLink}>
        <button className={styles.button}>
          <span className={styles.goBack}>목록으로 돌아가기</span>
          <Image src={goBack} />
        </button>
      </Link>
    </>
  );
}
