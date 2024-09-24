import Image from "next/image";
import axios from "@/lib/axios";
import styles from "@/styles/BoardDetail.module.css";
import defaultUserImg from "@/images/defaultUserImg.png";
import borderLine from "@/images/borderLine.png";
import goBack from "@/images/ic_back.png";
import Link from "next/link";
import CommentList from "@/components/BoardDetail/CommentList";
import ArticleDropDown from "@/components/BoardDetail/ArticleDropDown";
import PostComment from "@/components/BoardDetail/PostComment";
import { useState } from "react";

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
  // 댓글 목록을 상태로 관리
  const [commentList, setCommentList] = useState(detailArticle.comment || []);
  console.log(commentList);

  const addComment = async (newComment) => {
    try {
      const res = await axios.post(`/articles/${detailArticle.id}/comments`, {
        content: newComment,
      });
      // 새로운 댓글을 목록에 추가
      setCommentList((prevComments) => [...prevComments, res.data]);
    } catch (error) {
      console.log("error", error);
    }
  };

  // test
  console.log(detailArticle.id);
  return (
    <div className={styles.container}>
      <div className={styles.articleContainer}>
        <div className={styles.header}>
          <div className={styles.titleHeader}>
            <span className={styles.title}>{detailArticle.title}</span>
            {/* DropDown 넣을 공간 */}
            <ArticleDropDown articleId={detailArticle.id} />
          </div>
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
      <PostComment addComment={addComment} />
      {/* 댓글 목록 컴포넌트 넣을 공간 */}
      <CommentList commentList={commentList} setCommentList={setCommentList} />
      <Link href={"/board"} className={styles.goBackLink}>
        <button className={styles.button}>
          <span className={styles.goBack}>목록으로 돌아가기</span>
          <Image src={goBack} alt="goBack" />
        </button>
      </Link>
    </div>
  );
}
